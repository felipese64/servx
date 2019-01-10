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
-- Table structure for table `os_recebe_produto`
--

DROP TABLE IF EXISTS `os_recebe_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_recebe_produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_os` int(11) DEFAULT NULL,
  `id_prod` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_os` (`id_os`),
  KEY `id_prod` (`id_prod`),
  CONSTRAINT `os_recebe_produto_ibfk_1` FOREIGN KEY (`id_os`) REFERENCES `tbos` (`id_os`),
  CONSTRAINT `os_recebe_produto_ibfk_2` FOREIGN KEY (`id_prod`) REFERENCES `tbprodutos` (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_recebe_produto`
--

LOCK TABLES `os_recebe_produto` WRITE;
/*!40000 ALTER TABLE `os_recebe_produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_recebe_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_recebe_servico`
--

DROP TABLE IF EXISTS `os_recebe_servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_recebe_servico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_os` int(11) DEFAULT NULL,
  `id_serv` int(11) DEFAULT NULL,
  `quantidade` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_os` (`id_os`),
  KEY `id_serv` (`id_serv`),
  CONSTRAINT `os_recebe_servico_ibfk_1` FOREIGN KEY (`id_os`) REFERENCES `tbos` (`id_os`),
  CONSTRAINT `os_recebe_servico_ibfk_2` FOREIGN KEY (`id_serv`) REFERENCES `tbservicos` (`id_serv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_recebe_servico`
--

LOCK TABLES `os_recebe_servico` WRITE;
/*!40000 ALTER TABLE `os_recebe_servico` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_recebe_servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbassistencia`
--

DROP TABLE IF EXISTS `tbassistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbassistencia` (
  `id_assistencia` int(11) NOT NULL AUTO_INCREMENT,
  `data_entrada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_saida` timestamp NULL DEFAULT NULL,
  `tipo_equip` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `data_fabricacao` timestamp NULL DEFAULT NULL,
  `modelo_equip` varchar(30) CHARACTER SET utf8 NOT NULL,
  `marca_equip` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `assistencia_equip` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `status_equip` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `defeito_equip` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `obs_equip` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `id_os` int(11) NOT NULL,
  PRIMARY KEY (`id_assistencia`),
  KEY `tbassistencia_ibfk_1` (`id_os`),
  CONSTRAINT `tbassistencia_ibfk_1` FOREIGN KEY (`id_os`) REFERENCES `tbos` (`id_os`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbassistencia`
--

LOCK TABLES `tbassistencia` WRITE;
/*!40000 ALTER TABLE `tbassistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbassistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbclientes`
--

DROP TABLE IF EXISTS `tbclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbclientes` (
  `idcli` int(11) NOT NULL AUTO_INCREMENT,
  `nomecli` varchar(30) DEFAULT NULL,
  `fantasiacli` varchar(50) DEFAULT NULL,
  `emailcli` varchar(50) DEFAULT NULL,
  `cpfcli` varchar(50) DEFAULT NULL,
  `tpessoacli` varchar(50) DEFAULT NULL,
  `rgiecli` varchar(50) DEFAULT NULL,
  `telcli` varchar(100) NOT NULL,
  `celcli` varchar(50) NOT NULL,
  `cadastrocli` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `obscli` varchar(100) DEFAULT NULL,
  `tipoendcli` varchar(50) NOT NULL,
  `endcli` varchar(50) NOT NULL,
  `complementocli` varchar(50) DEFAULT NULL,
  `bairrocli` varchar(50) DEFAULT NULL,
  `estadocli` varchar(50) DEFAULT 'MS',
  `cidadecli` varchar(50) DEFAULT 'Campo Grande',
  `cepcli` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idcli`),
  UNIQUE KEY `prof` (`nomecli`),
  UNIQUE KEY `nomecli` (`nomecli`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbclientes`
--

LOCK TABLES `tbclientes` WRITE;
/*!40000 ALTER TABLE `tbclientes` DISABLE KEYS */;
INSERT INTO `tbclientes` VALUES (25,'teste','','','','Física','','teste','','2018-10-17 23:43:47','','Casa','teste','','','MS','Campo Grande',''),(26,'ANDRE JUNQUEIRA','','','','Física','','999062751','999062751','2018-11-21 10:36:25','ORÇAMENTO TROCA DE 02 MICRO CHAVES 2606 ','Casa','ANTONIO MARIA COELHO 4846','','STA FÉ','MS','Campo Grande',''),(27,'CLEUZA M S OLIVEIRA','','cleuzamsoliveira@gmail.com','070.423.961.20','Física','','33242658','','2018-11-21 10:46:52','troca de estator e rolamentos motor lado dir \ntroca de rolamentos motor lado esquerdo\n','Casa','1º DE MAIO','','SÃO BENTO ','MS','Campo Grande',''),(28,'RODRIGO GODOY ','','','','Física','','9 8136-6791','','2018-11-21 10:54:28','TROCA PLACXA DE COMANDO MOTOR DE CORRENTE 433MHZ','Casa','CARLINA PEREIRA CONTAR 1205','','JARDIM VERANEIO','MS','Campo Grande','79036-500'),(29,'DORA','','','','Física','','33871831','9 9274 4884','2018-11-21 15:53:20','TROCA DO FIO DA TRAVA 09/11/18','Casa','JULIA PEREIRA DE SOUZA 613','','UNIVERSITÁRIO','MS','Campo Grande',''),(30,'ERICO  ','','','','Física','','9 99151770','9 99151770','2018-11-21 15:55:35','','Comércio','XV NOVEMBRO  2524','','CENTRO','MS','Campo Grande',''),(31,'RITA','','','','Física','','9 9149 7965','9 91497965','2018-11-21 17:56:48','TRAVA ELETRONICA TRAVOU COM POEIRA DEU GARANTIA','Casa','MARIA DAS DORES SOARES26','','AERO RANCHO','MS','Campo Grande',''),(33,'EDER ','','','','Física','','9 81150234','','2018-11-21 17:58:58','ESTICOU CORRENTE E LUBRIFICOU MOTOR','Casa','IBIRAPUERA 294','','SÃO LOURENÇO','MS','Campo Grande',''),(34,'GIULIANO','ELGA','','','Física','','9 99615550','9 99120470','2018-11-21 18:01:38','INSTALOU CENTRAL ALARME E CÂMERAS MêS 07/18','Casa','DOMINGOS JORGE VELHO 363','','VILAS BOAS','MS','Campo Grande',''),(35,'PAULO ','','','','Física','','9 96975412','','2018-11-21 18:03:17','FECHADURA HDL 07/11/18','Casa','MAR CÁSPIO 192','','CHAC CACHOEIRA','MS','Campo Grande',''),(36,'ARNALDO ','','','','Física','','3342 4724','9 84012333','2018-11-21 18:05:01','CONSERTO CENTRAL CHOQUE TROCA DE BATERIA,REVISOU CERCA 17/11/18','Casa','TOMÁS EDSON 1168','','VILA PROGRESSO','MS','Campo Grande',''),(37,'MIRIATO ','','','','Física','','999166586','','2018-11-21 18:06:32','CODIFICOU TX DELE','Casa','PEDRO CELESTINO 252','CASA 2','VILA CASTELO','MS','Campo Grande',''),(38,'THADEU ','','','','Física','','9 81090140','','2018-11-21 18:07:51','CODIFICOU 2 TX DELE','Casa','TECAÍNDA 50','','CARANDÁ','MS','Campo Grande',''),(39,'MARIA DE LURDES ','','','','Física','','3346-1292','','2018-11-21 18:15:17','REGULADO FIM DE CURSO MOTOR 16/11/18','Casa','DOS IPES 615','','JOQUEI CLUB','MS','Campo Grande',''),(40,'LUCIENE','','','','Física','','9 99058798','','2018-11-21 18:17:05','CODIFICOU 1 TX 16/11/18','Casa','TRAV MARIA DE LURDES VIDAL ROMA 44','','MATA DO JACINTO','MS','Campo Grande',''),(41,'MÁRIO ','','','','Física','','9 92294389','','2018-11-21 18:18:07','CONSERTO CENTRAL COMANDO E TROCA DA BATERIA','Casa','EPITÁCIO PESSOA 486','','VILAS BOAS ','MS','Campo Grande',''),(42,'ALUIZIO ','','','','Física','',' 9 99062677','','2018-11-21 18:19:13','','Casa','IPACARAÍ','','SÃ ','MS','Campo Grande',''),(43,'REGINA MARTINS','','','','Física','','9 9234 8385','','2018-11-21 18:21:12','CODIGFICADO 1 TX','Casa','NADIMA BAGDADE DAMAH 721 ','','DAMAH I','MS','Campo Grande',''),(44,'WILSON ABUD','','','','Física','','3382 4905','9 99818874','2018-11-21 18:24:33','TROCA DE ESTATOR JET FLEX 1500 14/11/18','Casa','UTINGA 31','','ANTONIO VENDAS','MS','Campo Grande',''),(46,'JOSEFA ','','','','Física','','3361-1532','9 96412045','2018-11-21 18:40:55','INSTALOU 2 TRAVAS 13/11/18','Casa','ITATIAIA 716','','STO ANTONIO','MS','Campo Grande',''),(47,'ESTER ','','','','Física','','30290254','','2018-11-21 18:42:23','VERIFICOU CERCA 09/11/18','Casa','PIAUI 176','','BELA VISTA','MS','Campo Grande',''),(48,'MIRIAN ','','','','Física','','9 99063360','','2018-11-21 18:43:51','PROGRAMOU 2 TX 10/11/18','Casa','TRÊS BARRAS 947','CASA 06','SÃO LURENÇO','MS','Campo Grande',''),(49,'EDGAR ','','','','Física','','9 99042511','','2018-11-21 18:45:15','TROCA COROA MOTOR 03/11/18','Casa','FRANCISCO PINTO DE ARRUDA 122 ','','PARQUE DALLAS','MS','Campo Grande',''),(50,'ANTONIO ','','','','Física','','9 99287472','','2018-11-21 18:46:53','CODIFICOU 01 TX 06/11/18','Casa','CARURU 506','','JARDIM CANGURU','MS','Campo Grande',''),(51,'GRANDE LOJA MAÇONICA ','SR JURACI','PATRIMONIO@GRANDELOJAMS.ORG.BR','15.479.439.0001-16','Jurídica','','33450333','9 99842943','2018-11-21 18:59:06','TROCA PLACA DE COMANDO MOTOR 299 MHZ  08/11/18','Casa','SUCRE 275','','VILA CARLOTA','MS','Campo Grande','79.051.905'),(52,'MARIZE ','','','','Física','','9 98296820','','2018-11-21 19:00:28','CODIFICOU UM TX ','Casa','IBIRAPUERA 427 ','CASA F','JARDIM IBIRAPUERA','MS','Campo Grande',''),(53,'NEUSA ','','','','Física','','9 91113947','','2018-11-21 19:02:18','VERIFICOU CERCA ELÉTRICA 20/11/18 ','Casa','BOLIVAR 776','','VILAS BOAS ','MS','Campo Grande',''),(54,'HENRIQUE','','','','Física','','9994502810','','2018-11-22 18:16:08','','Casa','JOÃO TESSITORI 403 ','','CHACARA CACHOEIRA','MS','Campo Grande','79040-250');
/*!40000 ALTER TABLE `tbclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbos`
--

DROP TABLE IF EXISTS `tbos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbos` (
  `id_os` int(11) NOT NULL AUTO_INCREMENT,
  `data_os` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atendimento_os` varchar(30) DEFAULT NULL,
  `tipo_os` varchar(30) DEFAULT NULL,
  `status_os` varchar(30) DEFAULT NULL,
  `relato_os` varchar(150) DEFAULT NULL,
  `solucao_os` varchar(150) DEFAULT NULL,
  `tecnico` varchar(30) DEFAULT NULL,
  `fechamento_os` date DEFAULT '3001-11-30',
  `comentarios_fechamento_os` varchar(150) NOT NULL DEFAULT '',
  `valorservicos_os` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorprodutos_os` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valordesconto_os` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorparcial_os` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valortotal_os` decimal(10,2) NOT NULL DEFAULT '0.00',
  `condicoes_avista_os` varchar(50) DEFAULT NULL,
  `condicoes_aprazo_os` varchar(50) DEFAULT NULL,
  `condicao_cheque` tinyint(1) NOT NULL DEFAULT '1',
  `condicao_cartao` tinyint(1) NOT NULL DEFAULT '1',
  `tipo_pagamento` varchar(20) DEFAULT 'Dinheiro',
  `avista_aprazo` varchar(20) DEFAULT 'Á Vista',
  `status_financeiro_os` varchar(30) DEFAULT NULL,
  `idcli` int(11) NOT NULL,
  PRIMARY KEY (`id_os`),
  KEY `idcli` (`idcli`),
  CONSTRAINT `tbos_ibfk_1` FOREIGN KEY (`idcli`) REFERENCES `tbclientes` (`idcli`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbos`
--

LOCK TABLES `tbos` WRITE;
/*!40000 ALTER TABLE `tbos` DISABLE KEYS */;
INSERT INTO `tbos` VALUES (1,'2018-11-22 10:52:03','Externo','Orçamento','A Enviar','','','Felipe Simões','3001-11-30','',0.00,0.00,0.00,0.00,0.00,'5','3',1,1,'Dinheiro','Á Vista','A Receber',26),(2,'2018-11-22 10:56:57','Externo','Ordem de Serviço','Autorizada','','','Felipe Simões','3001-11-30','',0.00,0.00,0.00,0.00,0.00,'5','3',1,1,'Dinheiro','Á Vista','A Receber',26);
/*!40000 ALTER TABLE `tbos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbprodutos`
--

DROP TABLE IF EXISTS `tbprodutos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbprodutos` (
  `id_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nome_prod` varchar(30) DEFAULT NULL,
  `desc_prod` varchar(30) DEFAULT NULL,
  `grupo_prod` varchar(30) DEFAULT NULL,
  `marca_prod` varchar(30) DEFAULT NULL,
  `custo_prod` decimal(10,2) DEFAULT NULL,
  `margem_prod` int(11) DEFAULT NULL,
  `preco_prod` decimal(10,2) DEFAULT NULL,
  `unidade_prod` enum('Pç.','m','Pct.') DEFAULT NULL,
  PRIMARY KEY (`id_prod`),
  UNIQUE KEY `nome_prod` (`nome_prod`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbprodutos`
--

LOCK TABLES `tbprodutos` WRITE;
/*!40000 ALTER TABLE `tbprodutos` DISABLE KEYS */;
INSERT INTO `tbprodutos` VALUES (5,'Conector BNC Security Parts',NULL,'CFTV','Security Parts',1.80,50,2.70,'Pç.'),(6,'Conector P4 Security Parts',NULL,'CFTV','Security Parts',1.70,50,2.55,'Pç.'),(7,'Cabo coaxial 4mm Maxcable',NULL,'CFTV','Maxcable',0.80,50,1.20,'m'),(8,'Rack horizontal Onix',NULL,'CFTV','Onix',126.00,50,190.00,'Pç.'),(9,'Fonte 12V 5A',NULL,'CFTV','Gigasat',65.00,50,98.00,'Pç.'),(11,'Modulo RJ11 Furukawa',NULL,NULL,NULL,NULL,NULL,12.90,NULL),(12,'Modulo RJ45 Furukawa',NULL,NULL,NULL,NULL,NULL,24.50,NULL),(13,'Cabo lan UTP Cat 5E Fastlan',NULL,NULL,NULL,NULL,NULL,1.20,NULL),(14,'Cabo CCI 50x2 Megatron',NULL,NULL,NULL,NULL,NULL,0.80,NULL),(15,'Conector RJ11',NULL,NULL,NULL,NULL,NULL,0.50,NULL),(16,'Conector RJ45',NULL,NULL,NULL,NULL,NULL,1.00,NULL),(17,'Cabo paralelo elétrica 2x2mm',NULL,NULL,NULL,NULL,NULL,3.30,NULL),(18,'Tomada p/ extensão 3 entradas ',NULL,NULL,NULL,NULL,NULL,18.70,NULL),(19,'Plug tomada 10A',NULL,NULL,NULL,NULL,NULL,3.30,NULL),(20,'Canaleta de piso 50x10',NULL,NULL,NULL,NULL,NULL,49.50,NULL),(21,'Eletroduto ¾ zincado ',NULL,NULL,NULL,NULL,NULL,21.00,NULL),(22,'Central Active 32 JFL',NULL,'Centrais Monitoradas','JFL',100.00,50,150.00,'Pç.');
/*!40000 ALTER TABLE `tbprodutos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbservicos`
--

DROP TABLE IF EXISTS `tbservicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbservicos` (
  `id_serv` int(11) NOT NULL AUTO_INCREMENT,
  `nome_serv` varchar(30) DEFAULT NULL,
  `desc_serv` varchar(30) DEFAULT NULL,
  `horas_serv` float DEFAULT NULL,
  `preco_hora_serv` decimal(10,2) DEFAULT NULL,
  `preco_serv` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_serv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbservicos`
--

LOCK TABLES `tbservicos` WRITE;
/*!40000 ALTER TABLE `tbservicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbservicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbusuarios`
--

DROP TABLE IF EXISTS `tbusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbusuarios` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(15) NOT NULL,
  `senha` varchar(15) NOT NULL,
  `perfil` varchar(10) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbusuarios`
--

LOCK TABLES `tbusuarios` WRITE;
/*!40000 ALTER TABLE `tbusuarios` DISABLE KEYS */;
INSERT INTO `tbusuarios` VALUES (1,'admin','admin','admin');
/*!40000 ALTER TABLE `tbusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(220) NOT NULL,
  `salario` varchar(220) NOT NULL,
  `idade` varchar(220) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Marcos Silva','32880','45'),(2,'Joao Silva','27075','36'),(3,'Maria Silva','96000','56'),(4,'Jose Silva','33306','21'),(5,'Mauro Silva','28270','37'),(6,'Andreia Silva','68200','36'),(7,'Isabele Silva','23750','21'),(8,'Lucas Silva','22790','22'),(9,'Diane Silva','50550','39'),(10,'Kelly Silva','93600','58'),(11,'Gregorio Silva','90560','54'),(12,'Nair Silva','44200','29'),(13,'Nelson Silva','43060','36'),(14,'Cesar Silva','53500','37'),(15,'Anderson Silva','38575','20'),(16,'Lurdes Silva','98500','59'),(17,'Ana Silva','82500','58'),(18,'Gloria Silva','37750','31'),(19,'Luiz  Silva','23200','20'),(20,'Daine Silva','21750','19'),(21,'Veronica Silva','45000','30'),(22,'Andre Silva','75000','45'),(23,'Wallace Silva','64500','32'),(24,'Luiza Silva','85600','23'),(25,'Angelica Silva','59721','47'),(26,'Romario Silva','92575','42'),(27,'Antao Silva','35765','28'),(28,'Wagner Silva','20685','28'),(29,'Sanzio Silva','85000','48'),(30,'Fabiana  Silva','18800','20'),(31,'Helio Silva','95400','37'),(32,'Orlei Silva','71450','53'),(33,'Reanto Silva','34500','27'),(34,'Sabino Silva','22550','22'),(35,'Turlo Silva','72405','46'),(36,'Viviane Silva','95675','57');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-02 18:10:13
