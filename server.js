const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/albums", function (req, res) {
  res.send(albumsData);
});

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/albums", (req, res) => {
  res.send("albumData");
});

app.get("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const album = albumsData.filter((al) => {
    return al.albumId === albumId;
  });
  res.send(album);
});

app.post("/albums/", (req, res) => {
  const newData = req.body;
  albumsData.push(newData);
  res.send(albumsData);
});

app.put("/albums/:albumId", (req, res) => {
//   res.send(`AlbumId of ${req.params.albumId} PUT request`);
  const albumIndex = albumsData.find(
    (album) => album.albumId === req.params.albumId
  );
  if (albumIndex !== -1) {
    const newAlbum = {
      "albumId": `${req.body.albumId}`,
      "artistName": `${req.body.artistName}`,
      "collectionName":` ${req.body.collectionName}`,
      "artworkUrl100":`${req.body.artworkUrl100}`,
      "releaseDate": `${req.body.releaseDate}`,
      "primaryGenreName": `${req.body.primaryGenreName}`,
      "url": `${req.body.url}`,
    };
    albumsData.splice(albumIndex, 1 , newAlbum)
    return res.status(200).send(albumsData);
  }else {
      return res.status(404).json({message: `Not Found ${req.params.albumId}`});
  }
});

app.delete('/albums/:albumId', (req, res) => {
    const albumIndex = albumsData.findIndex((album) => album.albumId === req.params.albumId);
    if(albumIndex !== -1) {
        albumsData.splice(albumIndex, 1);
        res.status(200).send(albumsData);
    }else {
        res.status(404).send({"msg": `No album with albumId of ${req.params.albumId}`});
    }
})

app.listen(PORT, () => {
  console.log(`The server is listening at PORT ${PORT}`);
});
