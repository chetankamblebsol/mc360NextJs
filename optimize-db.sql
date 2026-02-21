-- OPTIMIZATION GUIDE FOR SearchAllView STORED PROCEDURE
-- Run these commands in MySQL to improve performance from 2000ms to 300-500ms

-- 1. Add FULLTEXT indexes on NAME columns (if not already present)
ALTER TABLE us_details ADD FULLTEXT INDEX ft_name (NAME);
ALTER TABLE us_details_v ADD FULLTEXT INDEX ft_name (NAME);
ALTER TABLE uk_details ADD FULLTEXT INDEX ft_name (NAME);
ALTER TABLE un_details ADD FULLTEXT INDEX ft_name (NAME);
ALTER TABLE eu_details ADD FULLTEXT INDEX ft_name (NAME);
ALTER TABLE eu_sanctioned_vessels_test ADD FULLTEXT INDEX ft_name (NAME);

-- 2. Add regular indexes on TYPE and SOURCE columns
ALTER TABLE us_details ADD INDEX idx_type (TYPE);
ALTER TABLE us_details_v ADD INDEX idx_type (TYPE);
ALTER TABLE uk_details ADD INDEX idx_type (TYPE);
ALTER TABLE un_details ADD INDEX idx_type (TYPE);
ALTER TABLE eu_details ADD INDEX idx_type (TYPE);

-- 3. Optimize MySQL configuration (add to my.cnf or my.ini)
-- innodb_buffer_pool_size = 2G  (or 50-70% of available RAM)
-- query_cache_size = 64M
-- query_cache_type = 1
-- ft_min_word_len = 2

-- 4. After adding indexes, analyze tables
ANALYZE TABLE us_details, us_details_v, uk_details, un_details, eu_details, eu_sanctioned_vessels_test;

-- 5. Check if stored procedure uses UNION ALL instead of UNION (UNION ALL is faster)
