CREATE DATABASE  IF NOT EXISTS `servx` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `servx`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: servx
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_insert_product_on_po`
--

DROP TABLE IF EXISTS `tb_insert_product_on_po`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_insert_product_on_po` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `po_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT '1',
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_os` (`po_id`),
  KEY `id_prod` (`prod_id`),
  CONSTRAINT `tb_insert_product_on_po_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `tbpo` (`po_id`),
  CONSTRAINT `tb_insert_product_on_po_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `tbproducts` (`prod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_insert_product_on_po`
--

LOCK TABLES `tb_insert_product_on_po` WRITE;
/*!40000 ALTER TABLE `tb_insert_product_on_po` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_insert_product_on_po` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_insert_service_on_po`
--

DROP TABLE IF EXISTS `tb_insert_service_on_po`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_insert_service_on_po` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `po_id` int(11) DEFAULT NULL,
  `serv_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_os` (`po_id`),
  KEY `id_serv` (`serv_id`),
  CONSTRAINT `tb_insert_service_on_po_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `tbpo` (`po_id`),
  CONSTRAINT `tb_insert_service_on_po_ibfk_2` FOREIGN KEY (`serv_id`) REFERENCES `tbservices` (`serv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_insert_service_on_po`
--

LOCK TABLES `tb_insert_service_on_po` WRITE;
/*!40000 ALTER TABLE `tb_insert_service_on_po` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_insert_service_on_po` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbassistance`
--

DROP TABLE IF EXISTS `tbassistance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbassistance` (
  `assistance_id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closing_date` timestamp NULL DEFAULT NULL,
  `equipment_type` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `manufacturing_date` timestamp NULL DEFAULT NULL,
  `equipment_model` varchar(30) CHARACTER SET utf8 NOT NULL,
  `equipment_brand` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_assistance` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_status` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_defect` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `equipment_obs` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `po_id` int(11) NOT NULL,
  PRIMARY KEY (`assistance_id`),
  KEY `tbassistencia_ibfk_1` (`po_id`),
  CONSTRAINT `tbassistance_ibfk_1` FOREIGN KEY (`po_id`) REFERENCES `tbpo` (`po_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbassistance`
--

LOCK TABLES `tbassistance` WRITE;
/*!40000 ALTER TABLE `tbassistance` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbassistance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbcustomers`
--

DROP TABLE IF EXISTS `tbcustomers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbcustomers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(60) DEFAULT NULL,
  `customer_trade_name` varchar(60) DEFAULT NULL,
  `customer_email` varchar(50) DEFAULT NULL,
  `customer_cpf` varchar(50) DEFAULT NULL,
  `customer_natural_legal` varchar(50) DEFAULT NULL,
  `customer_rg` varchar(50) DEFAULT NULL,
  `customer_telephone` varchar(100) NOT NULL,
  `customer_cellphone` varchar(50) NOT NULL,
  `customer_registry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_obs` varchar(100) DEFAULT NULL,
  `customer_address_type` varchar(50) NOT NULL,
  `customer_address` varchar(50) NOT NULL,
  `customer_address_number` int(11) NOT NULL,
  `customer_address_complements` varchar(50) DEFAULT NULL,
  `customer_zone` varchar(50) DEFAULT NULL,
  `customer_state` varchar(50) DEFAULT 'MS',
  `customer_city` varchar(50) DEFAULT 'CAMPO GRANDE',
  `customer_cep` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `prof` (`customer_name`),
  UNIQUE KEY `nomecli` (`customer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbcustomers`
--

LOCK TABLES `tbcustomers` WRITE;
/*!40000 ALTER TABLE `tbcustomers` DISABLE KEYS */;
INSERT INTO `tbcustomers` VALUES (26,'ANDRE JUNQUEIRA','DFSFD','SDFSDF','sdfsd','Pessoa Física','sdfsd','999062751','999062751','0000-00-00 00:00:00','ORÇAMENTO TROCA DE 02 MICRO CHAVES 2606 ','Comércio','ANTONIO MARIA COELHO 4846',0,'SDFSDF','STA FÉ','MS','Campo Grande','sdfsdf'),(27,'CLEUZA M S OLIVEIRA','SADSAD','CLEUZAMSOLIVEIRA@GMAIL.COM','070.423.961.20','PESSOA FÍSICA','asdasd','33242658','asdasd','0000-00-00 00:00:00','TROCA DE ESTATOR E ROLAMENTOS MOTOR LADO DIR \nTROCA DE ROLAMENTOS MOTOR LADO ESQUERDO\n','RESIDÊNCIA','1º DE MAIO',0,'ASDASD','SÃO BENTO ','MS','CAMPO GRANDE','sadas'),(28,'RODRIGO GODOY ','','','','Física','','9 8136-6791','','2018-11-21 10:54:28','TROCA PLACXA DE COMANDO MOTOR DE CORRENTE 433MHZ','Casa','CARLINA PEREIRA CONTAR 1205',0,'','JARDIM VERANEIO','MS','Campo Grande','79036-500'),(29,'DORA','','','','Física','','33871831','9 9274 4884','2018-11-21 15:53:20','TROCA DO FIO DA TRAVA 09/11/18','Casa','JULIA PEREIRA DE SOUZA 613',0,'','UNIVERSITÁRIO','MS','Campo Grande',''),(30,'ERICO  ','','','','Física','','9 99151770','9 99151770','2018-11-21 15:55:35','','Comércio','XV NOVEMBRO  2524',0,'','CENTRO','MS','Campo Grande',''),(31,'RITA','','','','Física','','9 9149 7965','9 91497965','2018-11-21 17:56:48','TRAVA ELETRONICA TRAVOU COM POEIRA DEU GARANTIA','Casa','MARIA DAS DORES SOARES26',0,'','AERO RANCHO','MS','Campo Grande',''),(33,'EDER ','','','','Física','','9 81150234','','2018-11-21 17:58:58','ESTICOU CORRENTE E LUBRIFICOU MOTOR','Casa','IBIRAPUERA 294',0,'','SÃO LOURENÇO','MS','Campo Grande',''),(34,'GIULIANO','ELGA','','','Física','','9 99615550','9 99120470','2018-11-21 18:01:38','INSTALOU CENTRAL ALARME E CÂMERAS MêS 07/18','Casa','DOMINGOS JORGE VELHO 363',0,'','VILAS BOAS','MS','Campo Grande',''),(35,'PAULO ','','','','Física','','9 96975412','','2018-11-21 18:03:17','FECHADURA HDL 07/11/18','Casa','MAR CÁSPIO 192',0,'','CHAC CACHOEIRA','MS','Campo Grande',''),(36,'ARNALDO ','','','','Física','','3342 4724','9 84012333','2018-11-21 18:05:01','CONSERTO CENTRAL CHOQUE TROCA DE BATERIA,REVISOU CERCA 17/11/18','Casa','TOMÁS EDSON 1168',0,'','VILA PROGRESSO','MS','Campo Grande',''),(37,'MIRIATO ','','','','Física','','999166586','','2018-11-21 18:06:32','CODIFICOU TX DELE','Casa','PEDRO CELESTINO 252',0,'CASA 2','VILA CASTELO','MS','Campo Grande',''),(38,'THADEU ','','','','Física','','9 81090140','','2018-11-21 18:07:51','CODIFICOU 2 TX DELE','Casa','TECAÍNDA 50',0,'','CARANDÁ','MS','Campo Grande',''),(39,'MARIA DE LURDES ','','','','Física','','3346-1292','','2018-11-21 18:15:17','REGULADO FIM DE CURSO MOTOR 16/11/18','Casa','DOS IPES 615',0,'','JOQUEI CLUB','MS','Campo Grande',''),(40,'LUCIENE','','','','Física','','9 99058798','','2018-11-21 18:17:05','CODIFICOU 1 TX 16/11/18','Casa','TRAV MARIA DE LURDES VIDAL ROMA 44',0,'','MATA DO JACINTO','MS','Campo Grande',''),(41,'MÁRIO ','','','','Física','','9 92294389','','2018-11-21 18:18:07','CONSERTO CENTRAL COMANDO E TROCA DA BATERIA','Casa','EPITÁCIO PESSOA 486',0,'','VILAS BOAS ','MS','Campo Grande',''),(42,'ALUIZIO ','','','','Física','',' 9 99062677','','2018-11-21 18:19:13','','Casa','IPACARAÍ',0,'','SÃ ','MS','Campo Grande',''),(43,'REGINA MARTINS','','','','Física','','9 9234 8385','','2018-11-21 18:21:12','CODIGFICADO 1 TX','Casa','NADIMA BAGDADE DAMAH 721 ',0,'','DAMAH I','MS','Campo Grande',''),(44,'WILSON ABUD','','','','Física','','3382 4905','9 99818874','2018-11-21 18:24:33','TROCA DE ESTATOR JET FLEX 1500 14/11/18','Casa','UTINGA 31',0,'','ANTONIO VENDAS','MS','Campo Grande',''),(46,'JOSEFA ','','','','Física','','3361-1532','9 96412045','2018-11-21 18:40:55','INSTALOU 2 TRAVAS 13/11/18','Casa','ITATIAIA 716',0,'','STO ANTONIO','MS','Campo Grande',''),(47,'ESTER ','','','','Física','','30290254','','2018-11-21 18:42:23','VERIFICOU CERCA 09/11/18','Casa','PIAUI 176',0,'','BELA VISTA','MS','Campo Grande',''),(48,'MIRIAN ','','','','Física','','9 99063360','','2018-11-21 18:43:51','PROGRAMOU 2 TX 10/11/18','Casa','TRÊS BARRAS 947',0,'CASA 06','SÃO LURENÇO','MS','Campo Grande',''),(49,'EDGAR ','','','','Física','','9 99042511','','2018-11-21 18:45:15','TROCA COROA MOTOR 03/11/18','Casa','FRANCISCO PINTO DE ARRUDA 122 ',0,'','PARQUE DALLAS','MS','Campo Grande',''),(50,'ANTONIO ','','','','Física','','9 99287472','','2018-11-21 18:46:53','CODIFICOU 01 TX 06/11/18','Casa','CARURU 506',0,'','JARDIM CANGURU','MS','Campo Grande',''),(51,'GRANDE LOJA MAÇONICA ','SR JURACI','PATRIMONIO@GRANDELOJAMS.ORG.BR','15.479.439.0001-16','Jurídica','','33450333','9 99842943','2018-11-21 18:59:06','TROCA PLACA DE COMANDO MOTOR 299 MHZ  08/11/18','Casa','SUCRE 275',0,'','VILA CARLOTA','MS','Campo Grande','79.051.905'),(52,'MARIZE ','','','','Física','','9 98296820','','2018-11-21 19:00:28','CODIFICOU UM TX ','Casa','IBIRAPUERA 427 ',0,'CASA F','JARDIM IBIRAPUERA','MS','Campo Grande',''),(53,'NEUSA ','','','','Física','','9 91113947','','2018-11-21 19:02:18','VERIFICOU CERCA ELÉTRICA 20/11/18 ','Casa','BOLIVAR 776',0,'','VILAS BOAS ','MS','Campo Grande',''),(54,'HENRIQUE','','','','Física','','9994502810','','2018-11-22 18:16:08','','Casa','JOÃO TESSITORI 403 ',0,'','CHACARA CACHOEIRA','MS','Campo Grande','79040-250'),(55,'xaaaaax','aaaaaaa','asasasasas','aaaaaaaa','AAAAAAAAA','AAAAAAAAAAAA','321312312313','12312312312312','2019-02-13 22:09:46','ASDASDAWSDWAD','1233123123123','SDASDASDASDSAD',232,'ASDASDASDASD','ASDASDASDSD','SDASDASD','ASDASDASDASD','4324234234324234');
/*!40000 ALTER TABLE `tbcustomers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbpo`
--

DROP TABLE IF EXISTS `tbpo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbpo` (
  `po_id` int(11) NOT NULL AUTO_INCREMENT,
  `po_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `po_int_ext` varchar(30) DEFAULT NULL,
  `po_type` varchar(30) DEFAULT NULL,
  `po_status` varchar(30) DEFAULT NULL,
  `po_description` varchar(150) DEFAULT NULL,
  `po_solution` varchar(150) DEFAULT NULL,
  `po_technician` varchar(30) DEFAULT NULL,
  `po_colsing_date` date DEFAULT '3001-11-30',
  `po_closing_comments` varchar(150) NOT NULL DEFAULT '',
  `po_services_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `po_products_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `po_discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `po_partial_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `po_total_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `po_spot_payment_conditions` varchar(50) DEFAULT NULL,
  `po_forward_payment_conditions` varchar(50) DEFAULT NULL,
  `po_check_payment_option` tinyint(1) NOT NULL DEFAULT '1',
  `po_card_payment_option` tinyint(1) NOT NULL DEFAULT '1',
  `po_payment_type` varchar(20) DEFAULT 'Dinheiro',
  `po_spot_or_forward` varchar(20) DEFAULT 'Á Vista',
  `po_payment_status` varchar(30) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`po_id`),
  KEY `idcli` (`customer_id`),
  CONSTRAINT `tbpo_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `tbcustomers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbpo`
--

LOCK TABLES `tbpo` WRITE;
/*!40000 ALTER TABLE `tbpo` DISABLE KEYS */;
INSERT INTO `tbpo` VALUES (1,'2018-11-22 10:52:03','Externo','Orçamento','A Enviar','','','Felipe Simões','3001-11-30','',0.00,0.00,0.00,0.00,0.00,'5','3',1,1,'Dinheiro','Á Vista','A Receber',26),(2,'2018-11-22 10:56:57','Externo','Ordem de Serviço','Autorizada','','','Felipe Simões','3001-11-30','',0.00,0.00,0.00,0.00,0.00,'5','3',1,1,'Dinheiro','Á Vista','A Receber',26);
/*!40000 ALTER TABLE `tbpo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbproducts`
--

DROP TABLE IF EXISTS `tbproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbproducts` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(60) DEFAULT NULL,
  `prod_desc` varchar(120) DEFAULT NULL,
  `prod_group` varchar(30) DEFAULT NULL,
  `prod_brand` varchar(30) DEFAULT NULL,
  `prod_cost` decimal(10,2) DEFAULT NULL,
  `prod_markup` int(11) DEFAULT NULL,
  `prod_price` decimal(10,2) DEFAULT NULL,
  `prod_unit` enum('Pç.','m','Pct.') DEFAULT NULL,
  PRIMARY KEY (`prod_id`),
  UNIQUE KEY `nome_prod` (`prod_name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbproducts`
--

LOCK TABLES `tbproducts` WRITE;
/*!40000 ALTER TABLE `tbproducts` DISABLE KEYS */;
INSERT INTO `tbproducts` VALUES (5,'CONECTOR BNC SECURITY PARTY','','CFTV','SECURITY PARTS',1.80,50,2.70,'Pç.'),(6,'CONECTOR P4 SECURITY PARTS','','CFTV','SECURITY PARTS',1.70,50,2.55,'Pç.'),(7,'CABO COAXIAL 4MM MAXCABLE','','CFTV','MAXCABLE',0.80,50,1.20,'m'),(8,'RACK HORIZONTAL ONIX','','CFTV','ONIX',126.00,50,190.00,'Pç.'),(9,'FONTE 12V 5A','','CFTV','GIGASAT',65.00,50,98.00,'Pç.'),(11,'MODULO RJ11 FURUKAWA','','REDES','FURUKAWA',1.11,50,1.67,'Pç.'),(13,'Cabo lan UTP Cat 5E Fastlan',NULL,NULL,NULL,NULL,NULL,1.20,NULL),(14,'Cabo CCI 50x2 Megatron',NULL,NULL,NULL,NULL,NULL,0.80,NULL),(17,'Cabo paralelo elétrica 2x2mm',NULL,NULL,NULL,NULL,NULL,3.30,NULL),(20,'Canaleta de piso 50x10',NULL,NULL,NULL,NULL,NULL,49.50,NULL),(21,'Eletroduto ¾ zincado ',NULL,NULL,NULL,NULL,NULL,21.00,NULL),(22,'CENTRAL ACTIVE 32 JFL','','CENTRAIS MONITORADAS','JFL',100.00,50,150.00,'Pç.'),(23,'XXXXXX','','CENTRAIS MONITORADAS','ONIX',0.01,60,0.02,'Pç.');
/*!40000 ALTER TABLE `tbproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbservices`
--

DROP TABLE IF EXISTS `tbservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbservices` (
  `serv_id` int(11) NOT NULL AUTO_INCREMENT,
  `serv_name` varchar(60) DEFAULT NULL,
  `serv_desc` varchar(120) DEFAULT NULL,
  `serv_ts` smallint(6) DEFAULT NULL,
  `serv_ts_price` decimal(10,2) DEFAULT NULL,
  `serv_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`serv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbservices`
--

LOCK TABLES `tbservices` WRITE;
/*!40000 ALTER TABLE `tbservices` DISABLE KEYS */;
INSERT INTO `tbservices` VALUES (2,'CONFIGURAÇÃO DE DVR','',30,5.00,154.74),(3,'INSTALAÇÃO DE PONTO DE ALARME','',1,1.00,40.00),(4,'INSTALAÇÃO DE SENSORES DE ABERTURA','',1,1.00,180.00),(6,'VISITA TECNICA','',60,1.00,60.00),(8,'AAAAAAAAAA','',11,1.00,11.11);
/*!40000 ALTER TABLE `tbservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbusers`
--

DROP TABLE IF EXISTS `tbusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbusers` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_login` varchar(15) NOT NULL,
  `user_password` varchar(15) NOT NULL,
  `user_profile` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login` (`user_login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbusers`
--

LOCK TABLES `tbusers` WRITE;
/*!40000 ALTER TABLE `tbusers` DISABLE KEYS */;
INSERT INTO `tbusers` VALUES (1,'admin','admin','admin');
/*!40000 ALTER TABLE `tbusers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-13 19:21:06
