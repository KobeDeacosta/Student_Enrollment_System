-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 03:10 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollment_ccc`
--

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enroll_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subj_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`program_id`, `program_name`) VALUES
(3, 'BS Information Systems'),
(4, 'BS Tourism Management'),
(5, 'BS Hospitality Management'),
(6, 'BS Information Technology'),
(11, 'BS Sports Management'),
(12, 'BS Library and Information Systems'),
(15, 'BS Computer Science'),
(16, 'BS Sports Science');

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `sem_id` int(11) NOT NULL,
  `sem_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `semesters`
--

INSERT INTO `semesters` (`sem_id`, `sem_name`) VALUES
(1, '1st Semester'),
(2, '2nd Semester');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `program_id` int(11) NOT NULL,
  `sem_id` int(11) DEFAULT NULL,
  `year_id` int(11) DEFAULT NULL,
  `allowance` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_name`, `program_id`, `sem_id`, `year_id`, `allowance`) VALUES
(1942, 'Kobe Deacosta', 11, 1, 3, '30000.00'),
(1943, 'Amelyn Peñalosa', 12, 1, 2, '30000.00'),
(1944, 'Aravela Castillo', 12, 1, 2, '30000.00'),
(1947, 'Retchelle Carpio', 3, 1, 3, '30000.00'),
(1949, 'Princess April Hernandez', 12, 1, 2, '30000.00'),
(1950, 'Aliah Rose Bartolome', 4, 1, 3, '30000.00'),
(1951, 'Angel Kate Marasigan', 5, 1, 3, '30000.00'),
(1952, 'Jeremiah Delizo', 6, 1, 9, '50000.00');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `sem_id` int(11) DEFAULT NULL,
  `units` int(11) NOT NULL DEFAULT 3,
  `room` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `time` time DEFAULT NULL,
  `day` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`, `year_id`, `sem_id`, `units`, `room`, `start_time`, `end_time`, `time`, `day`) VALUES
(9, 'Introduction to Computing', NULL, NULL, 3, '101', '08:00:00', '10:30:00', NULL, 'TTH'),
(10, 'Computer Programming 1', NULL, NULL, 3, '101', '08:00:00', '10:00:00', NULL, 'MWF'),
(12, 'Website Development 1', NULL, NULL, 3, 'ComLab', '10:00:00', '12:00:00', NULL, 'MWF');

-- --------------------------------------------------------

--
-- Table structure for table `subject_days`
--

CREATE TABLE `subject_days` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `day` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `years`
--

CREATE TABLE `years` (
  `year_id` int(11) NOT NULL,
  `year_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `years`
--

INSERT INTO `years` (`year_id`, `year_name`) VALUES
(10, '1st Year'),
(2, '2nd Year'),
(3, '3rd Year'),
(9, '4th Year');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enroll_id`),
  ADD UNIQUE KEY `unique_enrollment` (`student_id`,`subj_id`),
  ADD KEY `subj_id` (`subj_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`sem_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `fk_semester` (`sem_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `fk_subject_year` (`year_id`),
  ADD KEY `fk_subjects_semesters` (`sem_id`);

--
-- Indexes for table `subject_days`
--
ALTER TABLE `subject_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `years`
--
ALTER TABLE `years`
  ADD PRIMARY KEY (`year_id`),
  ADD UNIQUE KEY `year_name` (`year_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enroll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `sem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1954;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `subject_days`
--
ALTER TABLE `subject_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `years`
--
ALTER TABLE `years`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`subj_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_semester` FOREIGN KEY (`sem_id`) REFERENCES `semesters` (`sem_id`),
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `fk_subject_year` FOREIGN KEY (`year_id`) REFERENCES `years` (`year_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_subjects_semesters` FOREIGN KEY (`sem_id`) REFERENCES `semesters` (`sem_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `years` (`year_id`),
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`sem_id`) REFERENCES `semesters` (`sem_id`);

--
-- Constraints for table `subject_days`
--
ALTER TABLE `subject_days`
  ADD CONSTRAINT `subject_days_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
