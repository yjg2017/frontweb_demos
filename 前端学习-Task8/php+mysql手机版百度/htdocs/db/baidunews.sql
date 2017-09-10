-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: 2017-08-09 12:52:36
-- 服务器版本： 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newstype` char(100) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) NOT NULL,
  `remark` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`, `remark`) VALUES
(10, '精选', '习近平：内蒙古各族干部群众要守望相助', '../images/news-1.JPEG', '2017-08-08 00:00:00', '腾讯新闻', ''),
(12, '精选', '习近平：内蒙古各族干部群众要守望相助', '../images/news-1.jpeg', '2017-08-08 00:00:00', '腾讯新闻', ''),
(13, '百家', '四川九寨沟发生7.0级地震 甘肃陕西等地有震感(图)', '../images/news-3.jpg', '2017-08-08 00:00:00', '百度新闻', ''),
(14, '图片', '守望相助七十载 壮美亮丽内蒙古', '../images/news-4.jpg', '2017-08-08 00:00:00', '百度新闻', ''),
(15, '精选', '习近平对四川九寨沟7.0级地震作出重要指示', '../images/news-5.jpg', '2017-08-09 00:00:00', '大苏网', ''),
(17, '娱乐', '123fsfsfsaf', '../images/news-6.jpeg', '2017-08-09 00:00:00', 'abd', ''),
(18, '社会', '云南马龙现宝马城管执法车？官方：系假冒', '../images/news-6.jpeg', '2017-08-10 00:00:00', 'testqqq', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
