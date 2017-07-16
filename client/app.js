var app = angular.module('app', ['ngMap']);

app.controller('AppCtrl', function($scope, $http) {

   const apiUrl = "https://etobee-tech-test.herokuapp.com/api";
   const apiMapUrl = "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDtP6A3_Jqg40EnmdzFARTtq35ihreFOqQ&mode=driving&";
   const staticMapUrl = "http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDtP6A3_Jqg40EnmdzFARTtq35ihreFOqQ&size=1024x1024&";
   $scope.apiMap = "";
   $scope.exportUrl = "";

   $scope.places = [];
   // call api to get all stored places
   $http.get(apiUrl+'/places').then(function(res){
      $scope.places = res.data;

      angular.forEach($scope.places, function(obj){
         obj.status = false;
      });

      // console.log($scope.places)
   });

   $scope.getpos = function (event) {
      $('input[name="lat"]').val(event.latLng.lat);
      $('input[name="lng"]').val(event.latLng.lng);
   }

   // make custom icon
   $scope.customIcon = {
      "scaledSize": [32, 32],
      "url": "https://asteeza.com/wp-content/uploads/marker-256.png"
   };

   // init route list
   $scope.route = [];
   // init center position
   // lat, lng in jakarta
   $scope.center = [-6.21462, 106.84513];

   // add route to route list
   $scope.routing = function(place) {
      $scope.route.push(place);
      place.status = true;

      // console.log($scope.route)
   }

   // remove route from route list
   $scope.remove = function(place) {
      for(var i = 0 ; i < $scope.route.length ; i++) {
         if($scope.route[i].id == place.id) {
            $scope.route.splice(i, 1);
            place.status = false;
         }
      }
      if($scope.route.length == 0) $('.info-map').children().remove();
   }

   $scope.points = "";
   $scope.path = "";
   $scope.routeWaypoints = "";
   $scope.origin = { lat: 0, lng: 0 };
   $scope.wayPoints = [];
   $scope.destination = { lat: 0, lng: 0 };
   $scope.$watchCollection('route', function() {
      $scope.routeWaypoints = "";
      // clear info-map
      $('#info-direction').children().remove();
      if($scope.route.length > 1) {
         // origin
         $scope.origin.lat = $scope.route[0].lat;
         $scope.origin.lng = $scope.route[0].lng;

         $scope.wayPoints = [];
         if($scope.route.length > 1) {

            for (var i = 1; i < $scope.route.length - 1; i++) {
               $scope.routeWaypoints += $scope.route[i].lat+","+$scope.route[i].lng;
               if( i != $scope.route.length - 1 ) $scope.routeWaypoints += "|";
               var obj = {
                  location: {
                     lat: parseFloat($scope.route[i].lat),
                     lng: parseFloat($scope.route[i].lng)
                  },
                  stopover: true
               };
               $scope.wayPoints.push(obj);

            }
         }

         // destination
         $scope.destination.lat = $scope.route[$scope.route.length-1].lat;
         $scope.destination.lng = $scope.route[$scope.route.length-1].lng;

          // origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA
         if($scope.route.length > 1) {
            $scope.apiMap = "";
            //apiMapUrl +
            $scope.apiMap =  "origin="+$scope.origin.lat+","+$scope.origin.lng+"&destination="+$scope.destination.lat+","+$scope.destination.lng;

            if($scope.routeWaypoints != "") apiMap += "&waypoints="+$scope.routeWaypoints;

            $http.get(apiUrl + '/routing/'+$scope.apiMap)
               .then(function(res) {
                  
                  var new_points = res.data.replace("\\\\", "\\");
                  // console.log(new_points)
                  $scope.points = new_points;
               })
            
         }

         

      }
      else {
         $scope.origin = {};
         $scope.destination = {};
      }

   });


   // calculate distance and duration
   $scope.$watchCollection('map.directionsRenderers[0].directions.routes[0].legs', function(maps) {
      $scope.total = 0;
      $scope.time = 0;
      $scope.path = "";
      angular.forEach(maps, function(map) {
         // calculate total distance
         var tmpTotal = map.distance.text.split(" ");
         $scope.total += parseFloat(tmpTotal[0]);
         // calculate time duration
         var tmpTime = map.duration.text.split(" ");
         $scope.time += parseInt(tmpTime[0]);

         var stepLength = map.steps.length;
         var i = 0;
         angular.forEach(map.steps, function(step) {
            
            $scope.path += parseFloat(step.start_location.lat()).toFixed(6)+","+parseFloat(step.start_location.lng()).toFixed(6);
            if( i != stepLength-1 ) $scope.path += "|";
            i++;
         });
      });


      $scope.exportUrl = "";
      for (var i = 0; i < $scope.route.length; i++) {
         $scope.pointer += "markers=color:red|" + $scope.route[i].name;

         if(i!=$scope.route.length-1) $scope.pointer+="&";
      }

      $scope.exportUrl = staticMapUrl + $scope.pointer;
      // console.log(staticMapUrl);
      
      $scope.exportUrl += "&path=color:0xff0000ff|weight:5|" + $scope.path + '&sensor=false';

      // $('#export').attr('href', exportUrl);
      // console.log(exportUrl)

   });

   $scope.export_map = function() {
      window.open($scope.exportUrl, '_blank');
   }

   // delete place in database
   $scope.destroy = function(place) {
      var deleteUser = window.confirm('delete?');
      place.status = false;
      if(deleteUser) {
         $http.delete(apiUrl+'/places/'+place.id, {params: {id: place.id}})
             .then(function(res) {
                // alert('success delete!')
                // console.log(res);

                for(var i = 0 ; i < $scope.places.length ; i++) {
                   if($scope.places[i].id == place.id) {
                      $scope.places.splice(i, 1);

                      window.setTimeout(function() {
                         $scope.$apply();
                      }, 100);
                   }
                }

             });
      }

   }

   // handle submit form
   $scope.submit = function(event) {
      event.preventDefault();

      $http({
         method: 'POST',
         url: apiUrl+'/places',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data: {
            id: generateUUID(),
            name: $('input[name="name"]').val(),
            lat: $('input[name="lat"]').val(),
            lng: $('input[name="lng"]').val(),
            address: $('textarea[name="formatted_address"]').val()
         }
      }).then(function (res) {
         // console.log(res)
         $scope.places.push(res.data);

         //empty all input
         $('input[name="autocomplete"]').val('');
         $('input[name="name"]').val('');
         $('input[name="lat"]').val('');
         $('input[name="lng"]').val('');
         $('textarea[name="formatted_address"]').val('');

         // alert user with success
         alert('Success Insert!');

         // refresh map
         window.setTimeout(function() {
            $scope.$apply();
         }, 100);
         // location.reload()
      });

   }

   // generate uuid for new id
   function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = (d + Math.random()*16)%16 | 0;
         d = Math.floor(d/16);
         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
   };

});