import express from "express";
import con from "../connexion/bd.js";
import jwt from 'jsonwebtoken';


const router = express.Router()
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin Where name=? and password = ?"
    con.query(sql, [req.body.name, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Erreur de Query" })
        if (result.length > 0) {
            const name = result[0].name;
            const token = jwt.sign({ role: "admin", name: name }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token)
            return res.json({ loginStatus: true})
        }else{
            return res.json({ loginStatus: false, Error: "votre nom et mot de pass est incorect" })
        }
    })


})

router.get('/categorie', (req, res) => {
    const sql = "SELECT * FROM pret_bank";
    con.query(sql, (err, result) => {
        if(err) return  res.json({Status: false, Error: 'Erreur de Query'});
        return res.json({Status: true, Result: result});
    });
});


router.post('/add_Pret', (req, res) => {
    const sql = "INSERT INTO pret_bank (`nom_client`) VALUES (?)"
    con.query(sql, [req.body.name], (err, result) => {
        if(err) return  res.json({Status: false, Error: 'Erreur de Querry'})
        return res.json({Status: true})
    })
})

router.post('/add_New', (req, res) => {
    const sql = `INSERT INTO banque(nom_client, nom_banque_id, montant, date, taux_pret, montant_a_payer, image) VALUES (?,?,?,?,?, (montant * (1 + taux_pret)), ?)`;
    const values = [
      req.body.nom_client,
      req.body.nom_banque_id,
      req.body.montant,
      req.body.date,
      req.body.taux_pret,
      "-" // Assurez-vous de remplacer "-" par la valeur attendue pour l'image
    ];
    con.query(sql, values, (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Erreur de Query' });
      return res.json({ Status: true });
    });
});

  
  router.get('/fonction', (req, res) => {
    const sql = "SELECT * FROM banque";
    con.query(sql, (err, result) => {
        if(err) return  res.json({Status: false, Error: 'Erreur de Query'});
        return res.json({Status: true, Result: result});
    });
});

router.get('/fonction', (req, res) => {
    const sql = "SELECT *, (montant * (1 + taux_pret)) AS montant_a_payer FROM banque";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status: false, Error: 'Erreur de Query'});

        // Calculer montant_a_payer pour chaque ligne de résultat
        result.forEach(row => {
            row.montant_a_payer = row.montant * (1 + row.taux_pret);
        });

        return res.json({Status: true, Result: result});
    });
});

router.get('/fonction/:num_compte', (req, res) => {
    const num_compte = req.params.num_compte;
    const sql = "SELECT *FROM banque WHERE num_compte = ?";
    con.query(sql, [num_compte], (err, result) => {
        if(err) return  res.json({Status: false, Error: 'Erreur de Query'});
        return res.json({Status: true, Result: result});
    });
});

router.get('/fonction/:num_compte', (req, res) => {
    const num_compte = req.params.num_compte;
    
    const sql = "SELECT *, (montant * (1 + taux_pret)) AS montant_a_payer FROM banque";
    con.query(sql, [num_compte], (err, result) => {
        if (err) return res.json({Status: false, Error: 'Erreur de Query'});

        // Calculer montant_a_payer pour chaque ligne de résultat
        result.forEach(row => {
            row.montant_a_payer = row.montant * (1 + row.taux_pret);
        });

        return res.json({Status: true, Result: result});
    });
});

router.put('/edith_fonct/:num_compte', (req, res) => {
    const num_compte = req.params.num_compte;
    const sql = `UPDATE banque 
                 SET nom_client=?, nom_banque_id=?, montant=?, date=?, taux_pret=?, montant_a_payer=?
                 WHERE num_compte=?`;
  
    // Vérifier les valeurs obligatoires et fournir des valeurs par défaut si nécessaire
    const nom_client = req.body.nom_client || '';
    const nom_banque_id = req.body.nom_banque_id || '';
    const montant = req.body.montant || 0; // Valeur par défaut à 0 si non fournie
    const date = req.body.date || ''; // Valeur par défaut vide si non fournie
    const taux_pret = req.body.taux_pret || 0; // Valeur par défaut à 0 si non fournie
    const montant_a_payer = (montant * (1 + taux_pret / 100)).toFixed(2); // Calcul du montant à payer
  
    const values = [nom_client, nom_banque_id, montant, date, taux_pret, montant_a_payer, num_compte];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erreur de Query :", err);
        return res.status(500).json({ Status: false, Error: 'Erreur de Query' });
      }
      return res.json({ Status: true });
    });
  });

  router.get('/total_count', (req, res) =>{
    const sql = "SELECT SUM(montant_a_payer) as montant_a_payer FROM banque ";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Erreur de Query' + err });
        return res.json({ Status: true, Result: result});
    });
  })
  router.get('/min_count', (req, res) => {
    const sql = "SELECT MIN(montant_a_payer) AS min_montant_a_payer FROM banque";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Erreur de Query' + err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/max_count', (req, res) => {
    const sql = "SELECT MAX(montant_a_payer) AS max_montant_a_payer FROM banque";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Erreur de Query' + err });
        return res.json({ Status: true, Result: result });
    });
});



router.delete('/delete_fonct/:num_compte', (req, res) => {
    const num_compte = req.params.num_compte;
    const sql = `DELETE FROM banque WHERE num_compte = ?`;
    con.query(sql, [num_compte], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Erreur de Query' + err });
        return res.json({ Status: true });
    });
});



export { router as adminRoute }