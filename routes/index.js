var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mifo3661",
    database: "trgovina"
});

con.connect(function(err) {
	if(err){
		console.log('Connecting error.');
		return;
	}
	
});

router.get('/', function(req, res, next) {

		res.render('index');

});

//Korisnici
router.get('/korisnici', function(req, res, next) {
	con.query("select korisnici.id, ime, prezime, uloga_id, naziv from korisnici join uloga on korisnici.uloga_id = uloga.id;", function(err, data){
		if(err) throw err;
		console.log(data);
		res.render('korisnici', {title: "Korisnici", data: data});
	})
});

router.get('/uredikorisnika', function(req, res, next){
	var data = "";
	var id = req.query.id;
    con.query('SELECT * FROM korisnici WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('uredikorisnika', { title: 'Uredi Korisnika', data: data });
    });
});

router.post('/uredikorisnika', function(req, res, next) {

    var id = req.body.id;

    var sql = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        uloga_id: req.body.iduloga
    };

    var qur = con.query('UPDATE korisnici SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('korisnici');
    });

});

router.get('/obrisikorisnika', function(req, res, next) {
    var id = req.query.id;
    var qur = con.query('DELETE FROM korisnici WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('korisnici');
    });
});

router.post('/dodajKorisnika', function(req, res, next) {
    var sql = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        uloga_id: req.body.iduloga
        };
    var qur = con.query('INSERT INTO korisnici SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
            }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('korisnici');
            });
});

//Proizvodi
router.get('/proizvodi', function(req, res, next) {
    con.query("select proizvodi.id, proizvodi.naziv, cijena, kolicina, pdv_kategorija, id_dobavljac, dobavljac.naziv as dobavljac from proizvodi join dobavljac on proizvodi.id_dobavljac = dobavljac.id;", function(err, data){
        if(err) throw err;
        console.log(data);
        res.render('proizvodi', {title: "Proizvodi", data: data});
    })
});

router.get('/urediproizvod', function(req, res, next){
    var data = "";
    var id = req.query.id;
    con.query('SELECT * FROM proizvodi WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('urediproizvod', { title: 'Uredi Proizvod', data: data });
    });
});

router.post('/urediproizvod', function(req, res, next) {

    var id = req.body.id;

    var sql = {
        naziv: req.body.naziv,
        cijena: req.body.cijena,
        kolicina: req.body.kolicina,
        pdv_kategorija: req.body.pdvkategorija,
        id_dobavljac: req.body.dobavljacid
    };

    var qur = con.query('UPDATE proizvodi SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('proizvodi');
    });

});

router.get('/obrisiproizvod', function(req, res, next) {
    var id = req.query.id;
    var qur = con.query('DELETE FROM proizvodi WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('proizvodi');
    });
});

router.post('/dodajproizvod', function(req, res, next) {
    var sql = {
        naziv: req.body.naziv,
        cijena: req.body.cijena,
        kolicina: req.body.kolicina,
        pdv_kategorija: req.body.pdvkategorija,
        id_dobavljac: req.body.dobavljacid
        };
    var qur = con.query('INSERT INTO proizvodi SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
            }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('proizvodi');
            });
});

//Računi

router.get('/racuni', function(req, res, next) {
    con.query("SELECT * from racun", function(err, data, fields){
        if(err) throw err;
        console.log(data);
        console.log(fields);
        res.render('racuni', {title: 'Računi', data: data, fields: fields});
    });
});
router.post('/noviracun', function(req, res, next) {
    var sql = {
        datum: req.body.datum,
        nacin_placanja_id: req.body.nacinplacanja,
        id_zaposlenik: req.body.idzaposlenik,
        };
    var qur = con.query('INSERT INTO racun SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
            }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('racuni');
            });
});

//Zaposlenici
router.get('/zaposlenici', function(req, res, next) {
    con.query("SELECT * from zaposlenici", function(err, data, fields){
        if(err) throw err;
        console.log(data);
        console.log(fields);
        res.render('zaposlenici', {title: 'Zaposlenici', data: data, fields: fields});
    });
});

module.exports = router;