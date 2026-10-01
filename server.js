// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================

const express = require("express");
const app     = express();
const PORT    = 3000;

app.use(express.json());
app.use(express.static("public"));
// ---- LISTA 1: artistas (cada um tem um id) ----

const artistas = [
  {id: 1, nome: "Michael Jackson", pais: "EUA"},
  {id: 2, nome: "Djavan", pais: "Brasil"},
  {id: 3, nome: "Elvis Presley", pais: "EUA"},
  {id: 4, nome: "Daft Punk", pais: "França"}
]

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----

const musicas = [
  {id: 1, titulo: "Smooth Criminal", artistaId: 1, duracao: 257},
  {id: 2, titulo: "Hound Dog", artistaId: 3, duracao: 133},
  {id: 3, titulo: "Jailhouse Rock", artistaId: 3, duracao: 155},
  {id: 4, titulo: "Oceano", artistaId: 2, duracao: 296},
  {id: 5, titulo: "Sina", artistaId: 2, duracao: 329},
  {id: 6, titulo: "One More Time", artistaId: 4, duracao: 320}

]

// 1) LISTAR ARTISTAS

app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// TODO: responder a lista de artistas com res.status(200).json(...)

app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);
    return {
      titulo: m.titulo,
      duracao: m.duracao,
      artista: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-"
    };
  });
  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doArtista = musicas.filter((m) => m.artistaId === id);
  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
})