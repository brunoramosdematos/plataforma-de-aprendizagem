-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: plataforma_aprendizado
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nivel_programacao` enum('Iniciante','Intermediário','Avançado') NOT NULL,
  `dificuldades` text,
  `objetivos` text,
  `preferencias_aprendizado` text,
  `linguagens_interesse` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,'João Silva','joao.silva@example.com','senha123','1990-01-01','Iniciante','Falta de prática','Aprender Python','Vídeos','Python, JavaScript');
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunorecurso`
--

DROP TABLE IF EXISTS `alunorecurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunorecurso` (
  `id_aluno` int NOT NULL,
  `id_recurso` int NOT NULL,
  `progresso` varchar(255) DEFAULT NULL,
  `feedback` text,
  PRIMARY KEY (`id_aluno`,`id_recurso`),
  KEY `id_recurso` (`id_recurso`),
  CONSTRAINT `alunorecurso_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id`),
  CONSTRAINT `alunorecurso_ibfk_2` FOREIGN KEY (`id_recurso`) REFERENCES `recursoaprendizado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunorecurso`
--

LOCK TABLES `alunorecurso` WRITE;
/*!40000 ALTER TABLE `alunorecurso` DISABLE KEYS */;
INSERT INTO `alunorecurso` VALUES (1,1,'75%','Muito bom até agora');
/*!40000 ALTER TABLE `alunorecurso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interacao`
--

DROP TABLE IF EXISTS `interacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_aluno` int DEFAULT NULL,
  `tipo` enum('Forum','Chat','Tutoria') NOT NULL,
  `mensagem` text,
  `data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_aluno` (`id_aluno`),
  CONSTRAINT `interacao_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interacao`
--

LOCK TABLES `interacao` WRITE;
/*!40000 ALTER TABLE `interacao` DISABLE KEYS */;
INSERT INTO `interacao` VALUES (1,1,'Forum','Estou tendo dificuldades com loops em Python','2024-06-08 16:22:50');
/*!40000 ALTER TABLE `interacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recursoaprendizado`
--

DROP TABLE IF EXISTS `recursoaprendizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recursoaprendizado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descricao` text,
  `tipo` enum('Tutorial','Curso','Exercício') NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recursoaprendizado`
--

LOCK TABLES `recursoaprendizado` WRITE;
/*!40000 ALTER TABLE `recursoaprendizado` DISABLE KEYS */;
INSERT INTO `recursoaprendizado` VALUES (1,'Curso de Python para Iniciantes','Curso completo de Python','Curso','https://example.com/python-curso');
/*!40000 ALTER TABLE `recursoaprendizado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-08 17:33:22
