const fs = require('fs');
const data = require('area-data');
const { pcaa } = data;
const result = [];
const root = pcaa['86'];
// 创建一个可以写入的流，写入到文件 output.txt 中
const writerStream = fs.createWriteStream('data.sql');

Object.keys(root).forEach(p => {
    result.push({
        code: p,
        province: p.substring(0, 2),
        city: p.substring(2, 4),
        county: p.substring(4, 6),
        province_name: root[p]
    });
    Object.keys(pcaa[p]).filter(c => !result.some(item => item.code === c)).forEach(city => {
        result.push({
            code: city,
            province: city.substring(0, 2),
            city: city.substring(2, 4),
            county: city.substring(4, 6),
            province_name: root[p],
            city_name: pcaa[p][city]
        });
        Object.keys(pcaa[city]).filter(c => c.length === 6 && !result.some(item => item.code === c)).forEach(county => {
            result.push({
                code: county,
                province: county.substring(0, 2),
                city: county.substring(2, 4),
                county: county.substring(4, 6),
                province_name: root[p],
                city_name: pcaa[p][city],
                county_name: pcaa[city][county]
            });
        });
    });
});
result.forEach(item => {
    // 使用 utf8 编码写入数据
    const sql = `INSERT INTO t_area_data (${Object.keys(item).map(k => `\`${k}\``).join(',')}) VALUES (${Object.keys(item).map(k => `'${item[k]}'`).join(',')});`;
    writerStream.write(sql, 'UTF8');
    writerStream.write('\r\n', 'UTF8');
});
console.log('ok');
// 标记文件末尾
writerStream.end();
