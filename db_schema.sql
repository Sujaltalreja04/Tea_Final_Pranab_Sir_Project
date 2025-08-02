CREATE DATABASE  IF NOT EXISTS `admin_details` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `admin_details`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: admin_details
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `booking_details`
--

DROP TABLE IF EXISTS `booking_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FULL_NAME` varchar(45) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PHONE` bigint DEFAULT NULL,
  `MESSAGE` longtext,
  `ADDRESS` longtext,
  `BOOKED_SLOT` datetime DEFAULT NULL,
  `SLOT_ID` int DEFAULT NULL,
  `CLIENT_ID` int DEFAULT NULL,
  `STATUS` varchar(20) DEFAULT 'booked',
  PRIMARY KEY (`ID`),
  KEY `fk_booking_slot` (`SLOT_ID`),
  CONSTRAINT `fk_booking_slot` FOREIGN KEY (`SLOT_ID`) REFERENCES `time_slot_details` (`SLOT_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile_details`
--

DROP TABLE IF EXISTS `profile_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(42) DEFAULT NULL,
  `TITLE` varchar(42) DEFAULT NULL,
  `RATING` float DEFAULT NULL,
  `CATEGORY` varchar(255) DEFAULT NULL,
  `EXPERTISE` varchar(255) DEFAULT NULL,
  `REVIEWS` varchar(255) DEFAULT NULL,
  `EXPERIENCE` longtext,
  `SPECIALTIES` longtext,
  `AVAILABILITY` varchar(255) DEFAULT NULL,
  `RESPONSE_TIME` varchar(255) DEFAULT NULL,
  `HOURLY_RATE` int DEFAULT NULL,
  `LOCATION` varchar(255) DEFAULT NULL,
  `IMAGE` text NOT NULL,
  `PHONE` bigint DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `ON_SITE_VISIT_FEES` int DEFAULT NULL,
  `DESCRIPTION` longtext,
  `AGE` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review_details`
--

DROP TABLE IF EXISTS `review_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_details` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `FULL_NAME` varchar(255) DEFAULT NULL,
  `PHONE` bigint DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `MESSAGE` longtext,
  `EXPERT_ID` int DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `EXPERT_ID` (`EXPERT_ID`),
  CONSTRAINT `review_details_ibfk_1` FOREIGN KEY (`EXPERT_ID`) REFERENCES `profile_details` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_slot_details`
--

DROP TABLE IF EXISTS `time_slot_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slot_details` (
  `SLOT_ID` int NOT NULL AUTO_INCREMENT,
  `EXPERT_ID` int DEFAULT NULL,
  `AVAILABLE_DATE` date DEFAULT NULL,
  `AVAILABLE_TIME` time DEFAULT NULL,
  `SLOT_LABEL` varchar(255) DEFAULT NULL,
  `IS_BOOKED` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`SLOT_ID`),
  KEY `idx_expert_date` (`EXPERT_ID`,`AVAILABLE_DATE`),
  CONSTRAINT `fk_expert_profile` FOREIGN KEY (`EXPERT_ID`) REFERENCES `profile_details` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `EXPERIENCE_ID` int NOT NULL AUTO_INCREMENT,
  `EXPERT_ID` int DEFAULT NULL,
  `JOB_TITLE` varchar(255) DEFAULT NULL,
  `START_DATE` date DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `DESCRIPTION` longtext,
  `COMPANY_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EXPERIENCE_ID`),
  KEY `EXPERT_ID` (`EXPERT_ID`),
  CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`EXPERT_ID`) REFERENCES `profile_details` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11 17:31:54
