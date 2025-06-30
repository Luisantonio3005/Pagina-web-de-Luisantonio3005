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
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `series` (
  `serie_id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `año_lanzamiento` int DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `series`
--

LOCK TABLES `series` WRITE;
/*!40000 ALTER TABLE `series` DISABLE KEYS */;
INSERT INTO `series` VALUES (1,'Breaking Bad','Un profesor de química se convierte en un rey del narcotráfico.',2008,'Drama'),(2,'Stranger Things','Niños en los 80s enfrentan fuerzas sobrenaturales y secretos gubernamentales.',2016,'Ciencia ficción'),(3,'The Crown','Drama histórico sobre el reinado de la Reina Isabel II del Reino Unido.',2016,'Drama histórico'),(4,'Black Mirror','Serie de antología que explora un futuro inquietante y distópico.',2011,'Ciencia ficción'),(5,'The Witcher','Un cazador de monstruos lucha por encontrar su lugar en un mundo donde las personas a menudo son más perversas.',2019,'Fantasía'),(6,'The Mandalorian','Un pistolero solitario explora los confines de la galaxia, lejos de la autoridad de la Nueva República.',2019,'Ciencia ficción'),(7,'BoJack Horseman','Un caballo antropomórfico lucha con la depresión y la adicción en esta comedia de animación para adultos.',2014,'Comedia'),(8,'Arcane','Basada en el universo de League of Legends, esta serie explora los orígenes de algunos campeones icónicos.',2021,'Animación'),(9,'Peaky Blinders','Una banda de gánsteres de Birmingham de la década de 1920 se eleva a la prominencia.',2013,'Drama histórico'),(10,'Sherlock','El detective más famoso del mundo resuelve misterios en el Londres del siglo XXI.',2010,'Drama'),(11,'Narcos','La historia del narcotráfico en Colombia',2015,'Biografía'),(12,'Game of Thrones','Nobles familias luchan por el control del Trono de Hierro',2011,'Fantasía'),(13,'The Office','La vida cotidiana de los empleados de Dunder Mifflin',2005,'Comedia');
/*!40000 ALTER TABLE `series` ENABLE KEYS */;
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
