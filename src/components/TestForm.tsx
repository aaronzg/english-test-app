import { Button, HelperText, Label, Select } from "flowbite-react";
import { Toast } from "./Toast";
import React, { useState, useEffect } from "react";
import { useTestContext } from "../hooks/useTestContext";
export const TestForm = () => {
  const { setTestQuestions, setStartFrom, tabsRef } = useTestContext();

  const testQuestionsOptions = [5, 10, 15, 20, 25, 30, 40, 50, 100];
  const [optionValue, setOptionValue] = useState<number>();
  const [startValue, setStartValue] = useState<number>();
  // const [errorMessage, setErrorMessage] = useState('')

  const [errorMessage, setErrorMessage] = useState({
    questions: "",
    startFrom: "",
  });

  const [showToast, setShowToast] = useState(false);

  const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const chapterIdx = [
    0, 23, 48, 73, 98, 121, 146, 170, 195, 241, 266, 290, 315, 340, 365,
  ];

  useEffect(() => {
    const local = localStorage.getItem("initial-values");
    if (local) {
      const values = JSON.parse(local);
      setOptionValue(values.optionValue);
      setStartValue(values.startValue);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "test-questions") {
      e.preventDefault();
      const numberValue = Number(e.target.value);
      setOptionValue(numberValue);
      setErrorMessage((prev) =>
        e.target.value ? { ...prev, questions: "" } : prev
      );
    }

    if (e.target.id === "start-from") {
      e.preventDefault();
      const numberValue = Number(e.target.value);
      setStartValue(numberValue);
      setErrorMessage((prev) =>
        e.target.value ? { ...prev, startFrom: "" } : prev
      );
    }
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optionValue)
      return setErrorMessage((prev) => ({
        ...prev,
        questions: "Elige una opcion",
      }));
    if (startValue !== 0 && !startValue)
      return setErrorMessage((prev) => ({
        ...prev,
        startFrom: "Elige una opcion",
      }));
    setTestQuestions(optionValue);
    setStartFrom(startValue);

    localStorage.setItem(
      "initial-values",
      JSON.stringify({ optionValue, startValue })
    );
    setShowToast(true);
  };

  return (
    <>
      <div className="container px-5 py-6 rounded-xl space-y-3 md:bg-gray-700 max-w-max md:mx-auto md:mt-10">
        <h1>Contesta para continuar</h1>

        <form onSubmit={handleSumbit} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="test-questions"
              color={errorMessage.questions ? "failure" : "gray"}
            >
              Selecciona cuantas preguntas quieres
            </Label>
            <Select
              className="mt-1 md:max-w-2/3"
              id="test-questions"
              value={optionValue}
              onChange={handleChange}
              color={errorMessage.questions ? "failure" : "gray"}
            >
              <option value="">Selecciona</option>
              <option value={999}>Todas las preguntas</option>
              {testQuestionsOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt} preguntas
                </option>
              ))}
            </Select>
            {errorMessage && <HelperText>{errorMessage.questions}</HelperText>}
            <Label
              htmlFor="start-from"
              color={errorMessage.startFrom ? "failure" : "gray"}
            >
              Elige desde donde quieres empezar
            </Label>
            <Select
              className="mt-1 md:max-w-2/3"
              color={errorMessage.startFrom ? "failure" : "gray"}
              id="start-from"
              onChange={handleChange}
              value={startValue}
            >
              <option value="">Selecciona</option>
              {chapters.map((ch, id) => {
                return (
                  <option key={id} value={chapterIdx[id] - 1}>
                    Chapter {ch}
                  </option>
                );
              })}
            </Select>
            {errorMessage.startFrom && (
              <HelperText>{errorMessage.startFrom}</HelperText>
            )}
          </div>
          <Button type="submit" className="max-w-max">
            Continuar
          </Button>
        </form>
      </div>

      <Toast
        onClose={() => setShowToast(false)}
        visible={showToast}
        buttons={[
          <button
            key={1}
            className="rounded-lg p-1.5 text-sm font-medium text-primary-600 hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-700"
            onClick={() => tabsRef.current?.setActiveTab(1)}
          >
            Ir
          </button>,
        ]}
      >
        <div className="text-sm font-normal">Ya puedes acceder al test</div>
      </Toast>
    </>
  );
};
