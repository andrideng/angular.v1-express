# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: us-cdbr-sl-dfw-01.cleardb.net (MySQL 5.6.36-log)
# Database: ibmx_61d36916593550f
# Generation Time: 2017-07-15 07:09:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table place
# ------------------------------------------------------------

DROP TABLE IF EXISTS `place`;

CREATE TABLE `place` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lat` varchar(100) NOT NULL,
  `lng` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;

INSERT INTO `place` (`id`, `name`, `lat`, `lng`, `address`)
VALUES
	('01d2e91c-4018-457c-b8fd-83dcdde2fa77','Jakarta History Museum','-6.1351784466311','106.81328773498535','Jalan Taman Fatahillah No.1\nPinangsia\nTamansari\nWest Jakarta City, Jakarta 11110, Indonesia'),
	('1c6dc64e-65ad-4ad1-9555-5f290c09d002','Binus University, Anggrek Campus','-6.201722800000001','106.78238469999997','Jalan Kebon Jeruk Raya No.27, RT.1/RW.9, Kebon Jeruk, RT.1/RW.9, Kebon Jeruk'),
	('3a8d2510-46df-41bb-8872-c36f2d9f4e45','Binus University, Syahdan Campus','-6.2002291','106.78538679999997','Jl. KH. Syahdan No. 9, Kemanggisan, RT.6/RW.12, Palmerah, RT.6/RW.12, Palmerah'),
	('4d6f5016-8974-4c17-aae9-2d2d46966801','National Monument','-6.175371641294809','106.82710647583008','Gambir\nCentral Jakarta City\nJakarta\nIndonesia'),
	('5818aaf7-846b-4ecb-b4cc-0c5094eede71','Bank Indonesia Museum','-6.137141242185823','106.81285858154297','Jalan Jembatan Batu No.3, Pinangsia, Tamansari\nPinangsia\nTamansari\nKota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11110, Indonesia'),
	('5ef6ba86-8149-4598-a3c1-aec93e7a28d1','Soekarno-Hatta International Airport','-6.1275118','106.65368590000003','Jakarta'),
	('e513d534-c1a8-449d-b65f-46c4fb8886e8','Taman Menteng','-6.196162999999999','106.82961499999999','Jl. HOS. Cokroaminoto, RT.03 / RW.05, Menteng, RT.3/RW.5, Menteng'),
	('f34ea01b-916f-4a16-bc66-0951cdcd2aa0','CITICON','-6.192683799999999','106.79783520000001','Jl. Sulaiman No.15\nKemanggisan\nPalmerah\nWest Jakarta City, Jakarta 11480, Indonesia');

/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
