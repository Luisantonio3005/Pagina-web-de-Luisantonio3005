-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: netflixdb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actuaciones`
--

DROP TABLE IF EXISTS `actuaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actuaciones` (
  `actor_id` int NOT NULL,
  `serie_id` int NOT NULL,
  `personaje` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`actor_id`,`serie_id`),
  KEY `serie_id` (`serie_id`),
  CONSTRAINT `actuaciones_ibfk_1` FOREIGN KEY (`actor_id`) REFERENCES `actores` (`actor_id`),
  CONSTRAINT `actuaciones_ibfk_2` FOREIGN KEY (`serie_id`) REFERENCES `series` (`serie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actuaciones`
--

LOCK TABLES `actuaciones` WRITE;
/*!40000 ALTER TABLE `actuaciones` DISABLE KEYS */;
INSERT INTO `actuaciones` VALUES (1,1,'Walter White'),(2,2,'Eleven'),(3,3,'Reina Isabel II'),(5,5,'Geralt de Rivia'),(6,6,'Din Djarin'),(7,7,'BoJack Horseman'),(8,8,'Vi'),(9,9,'Tommy Shelby'),(10,10,'Sherlock Holmes'),(11,11,'Pablo Escobar'),(12,12,'Daenerys Targaryen'),(13,13,'Michael Scott'),(14,1,'Jesse Pinkman'),(15,2,'Joyce Byers'),(16,2,'Daenerys Targaryen'),(17,5,'Yennefer de Vengerberg'),(18,6,'Cara Dune'),(18,8,'Kamille \"Cami\" OConnell'),(19,7,'Princess Carolyn'),(20,13,'Sansa Stark'),(21,3,'Príncipe Felipe'),(22,8,'Jinx'),(23,9,'Arthur Shelby'),(24,10,'Dr. John Watson'),(25,11,'Steve Murphy'),(26,12,'Cersei Lannister'),(27,12,'Jon Snow'),(28,12,'Brienne of Tarth'),(29,4,'Elliot Alderson'),(30,2,'Olivia Crain'),(31,6,'Holden Ford'),(32,9,'Matt Murdock/Daredevil'),(33,3,'Penelope Featherington'),(34,7,'Otis Milburn'),(35,4,'Cameron Howe');
/*!40000 ALTER TABLE `actuaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 18:22:12
