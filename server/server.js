const { application } = require('express');
const express = require('express');
const db = require('./config/db');
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require('fs');

app.get('/', (req, res) =>{
    console.log('root!');
})

// 로그인
// app.get('/users/log_in/email=:email&pw=:pw', (req, res) => {
//     const email = req.params.email;
//     const pw = req.params.pw;
//     db.query(`select * from admin where email = ${email}`, (err, data) => {
//         if (data.length != 0) {
//             if (data.pw == pw) {
//                 // 로그인 성공
//             }
//             else {
//                 // 로그인 실패
//             }
//         }else{
//             db.query(`select * from emp where email = ${email}`, (err1, data1) =>{
//                 if (data1.length != 0){
//                     if (data.pw == pw) {
//                 // 로그인 성공
//             }
//             else {
//                 // 로그인 실패
//             }
//                 }else{
//                     // 로그인 실패
//                 }
//             })
//         }
//     })
// })

// 관리자: 아이디 목록 확인
app.get('/users/admin', (req, res) =>{
    console.log('user!');
    db.query('select * from admin', (err, data) => {
        if (!err) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
            console.log(data[i].id);
            }
        }else{
            console.log(err);
        }
    });
})

// co_name = company_name = 회사 이름
// mgr_name = manager_name = 메니저(담당자) 이름
// pn = phone number = 전화번호

// 관리자: 아이디 생성
app.get('/insert/admin/email=:email&pw=:pw&mgr_name=:mgr_name&pn=:pn', (req, res) =>{
    const email = req.params.email;
    const pw = req.params.pw;
    const mgr_name = req.params.mgr_name;
    const pn = req.params.pn;
    db.query(`insert into admin(email, pw, mgr_name, pn) values('${email}', '${pw}', '${mgr_name}', '${pn}')`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
    db.query(`update admin set auth = TRUE, gtw = FALSE where email = '${email}'`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

// 관리자: 아이디 수정
app.get('/update/admin/id=:id&name=:name&email=:email&pw=:pw&co_name=:co_name&mgr_name=:mgr_name&pn=:pn&team=:team&wt=:wt&role=:role', (req, res) => {
    const id = req.params.id;
    
    const name = req.params.name;
    const email = req.params.email;
    const pw = req.params.pw;
    const co_name = req.params.co_name;
    const mgr_name = req.params.mgr_name;
    const pn = req.params.pn;
    const team = req.params.team;
    const wt = req.params.wt;
    const role = req.params.role;
    db.query(`update admin set name = '${name}', email = '${email}', pw = '${pw}', co_name = '${co_name}', mgr_name = '${mgr_name}', pn = '${pn}', team = '${team}', wt = '${wt}', role = '${role}' where id=${id}`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

// 관리자: 출퇴근 수정
// app.get('/update/admin/id=:id&gtw=:gtw', (req, res) =>{
//     const id = req.params.id;

//     const gtw = req.params.gtw;


//     db.query(`update admin set gtw = ${gtw} where id = ${id}`, (err, data) =>{
//         if (!err){
//             console.log(data);
//         }else{
//             console.log(err);
//         }
//     })
//     if (gtw == 'TRUE') {
//         var date= new Date();
//         var year = date.getFullYear();
//         var month = date.getMonth()+1;
//         var day = date.getDate();
//         var hour = date.getHours();
//         var minute = date.getMinutes();
//         db.query(`insert into admin_working_time_start(id, year, mon, day, hour, min) values(${id}, ${year}, ${month}, ${day}, ${hour}, ${minute})`, (err, data) =>{
//             if (!err){
//                 console.log(data);
//             }else{
//                 console.log(err);
//             }
//         })
//     }
//     else {
//         var date= new Date();
//         var year = date.getFullYear();
//         var month = date.getMonth()+1;
//         var day = date.getDate();
//         var hour = date.getHours();
//         var minute = date.getMinutes();
//         db.query(`insert into admin_working_time_end(id, year, mon, day, hour, min) values(${id}, ${year}, ${month}, ${day}, ${hour}, ${minute})`, (err, data) =>{
//             if (!err){
//                 console.log(data);
//             }else{
//                 console.log(err);
//             }
//         })
//     }
// })

// 관리자: 아이디 삭제
app.get('/delete/admin/id=:id', (req, res) => {
    const id = req.params.id;
    console.log('id: ' + id);
    db.query(`delete from admin where id = ${id}`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

// emp = employee

// 일반: 아이디 목록 확인
app.get('/users/emp', (req, res) => {
    console.log('user!');
    db.query('select * from emp', (err, data) => {
        if (!err) {
            console.log(data);
        }else{
            console.log(err);
        }
    });
})

// pn = phone number = 전화번호
// role = 역할
// grw = go to work = 출퇴근 상태
// wt = work type = 근무 유형
// wh = work hour =  근무 시간

// 일반: 아아디 생성
app.get('/insert/emp/code=:code&name=:name&email=:email&pw=:pw&pn=:pn&team=:team&role=:role', (req, res) =>{
    const code = req.params.code;

    const name = req.params.name;
    const email = req.params.email;
    const pw = req.params.pw;
    const pn = req.params.pn;
    const team = req.params.team;
    const role = req.params.role;

    db.query(`insert into emp(name, email, pw, pn, team, role) values('${name}', '${email}', '${pw}', '${pn}', '${team}', '${role}')`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })

    db.query(`update emp set auth = FALSE, gtw = FALSE where email = '${email}'`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

// 일반: 아이디 수정
app.get('/update/emp/id=:id&name=:name&email=:email&pw=:pw&co_name=:co_name&mgr_name=:mgr_name&pn=:pn&team=:team&role=:role&wt=:wt', (req, res) => {
    const id = req.params.id;
    
    const name = req.params.name;
    const email = req.params.email;
    const pw = req.params.pw;
    const co_name = req.params.co_name;
    const mgr_name = req.params.mgr_name;
    const pn = req.params.pn;
    const team = req.params.team;
    const wt = req.params.wt;
    const role = req.params.role;

    db.query(`update emp set name = '${name}', email = '${email}', pw = '${pw}', co_name = '${co_name}', mgr_name = '${mgr_name}', pn = '${pn}', team = '${team}', wt = '${wt}', role = '${role}' where id = ${id}`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

// 일반: 출퇴근 수정
// app.get('/update/emp/id=:id&gtw=:gtw', (req, res) =>{
//     const id = req.params.id;

//     const gtw = req.params.gtw;


//     db.query(`update emp set gtw = ${gtw} where id = ${id}`, (err, data) =>{
//         if (!err){
//             console.log(data);
//         }else{
//             console.log(err);
//         }
//     })
//     if (gtw == 'TRUE') {
//         var date= new Date();
//         var year = date.getFullYear();
//         var month = date.getMonth()+1;
//         var day = date.getDate();
//         var hour = date.getHours();
//         var minute = date.getMinutes();
//         db.query(`insert into emp_working_time_start(id, year, mon, day, hour, min) values(${id}, ${year}, ${month}, ${day}, ${hour}, ${minute})`, (err, data) =>{
//             if (!err){
//                 console.log(data);
//             }else{
//                 console.log(err);
//             }
//         })
//     }
//     else {
//         var date= new Date();
//         var year = date.getFullYear();
//         var month = date.getMonth()+1;
//         var day = date.getDate();
//         var hour = date.getHours();
//         var minute = date.getMinutes();
//         db.query(`insert into emp_working_time_end(id, year, mon, day, hour, min) values(${id}, ${year}, ${month}, ${day}, ${hour}, ${minute})`, (err, data) =>{
//             if (!err){
//                 console.log(data);
//             }else{
//                 console.log(err);
//             }
//         })
//     }
// })

// 일반: 아이디 삭제
app.get('/delete/emp/id=:id', (req, res) => {
    const id = req.params.id;
    console.log('id: ' + id);
    db.query(`delete from emp where id = ${id}`, (err, data) =>{
        if (!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log('Server on: 4000');
});