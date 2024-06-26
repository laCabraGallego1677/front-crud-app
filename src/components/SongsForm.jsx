import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const initialToDo = { name: "", artist: "", genre: "", release_year: "" };

const SongsForm = ({
  getSongs,
  showSuccessNotf,
  showFailNotf,
  setIsLoading,
  songSelected,
  deselectSong,
}) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (songSelected) reset(songSelected);
    else reset(initialToDo);
  }, [songSelected]);

  const submit = (data) => {
    setIsLoading(true);
    if (songSelected) {
      // endpoint PUT -> /songs/:id
      axios
        .put(`http://localhost:8080/temas/${songSelected.id}`, data)
        .then(() => {
          getSongs();
          showSuccessNotf("Song updated successfully");
          deselectSong();
        })
        .catch(() => showFailNotf())
        .finally(() => setIsLoading(false));
    } else {
      // endpoint POST -> /songs
      axios
        .post("http://localhost:8080/temas", data)
        .then(() => {
          getSongs();
          showSuccessNotf("Song created successfully");
          reset(initialToDo);
        })
        .catch(() => showFailNotf())
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Form
      style={{ maxWidth: 900 }}
      className="mx-auto mb-5"
      onSubmit={handleSubmit(submit)}
    >
      <h1>New Song</h1>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="song.name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" {...register("name")} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="song.artist">
            <Form.Label>Artist</Form.Label>
            <Form.Control type="text" {...register("artist")} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="song.genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control type="text" {...register("genre")} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="song.Release_year">
            <Form.Label>Release Year</Form.Label>
            <Form.Control type="number" {...register("release_year")} />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit" className="mt-3">
        Submit
      </Button>
      {songSelected && (
        <Button onClick={deselectSong} variant="secondary" className="mt-3">
          Clear
        </Button>
      )}
    </Form>
  );
};

export default SongsForm;
