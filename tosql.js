import { pcaa } from 'area-data';
const result = [];
const root = pcaa['86'];
Object.keys(root).forEach(p => {
    result.push({
        code: p,
        province: p.substring(0, 2),
        city: '00',
        county: '00',
        province_name: root[p]
    });
    Object.keys(pcaa[p]).forEach(city => {
        result.push({
            code: city,
            province: p.substring(0, 2),
            city: city.substring(2, 4),
            county: '00',
            province_name: root[p],
            city_name: pcaa[p][city]
        });
        Object.keys(pcaa[city]).forEach(county => {
            result.push({
                code: county,
                province: p.substring(0, 2),
                city: city.substring(2, 4),
                county: county.substring(4, 6),
                province_name: root[p],
                city_name: pcaa[p][city],
                county_name: pcaa[city][county]
            });
        });
    });
});
result.forEach(item => console.log(`INSERT INTO t_area_data (${Object.keys(item).map(k => `\`${k}\``).join(',')}) VALUES (${Object.keys(item).map(k => `'${item[k]}'`).join(',')})`));
