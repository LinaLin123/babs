import React, { useState, useEffect } from "react";
import "./App.css";
import { Select, MenuItem, OutlinedInput, Typography, Box, Divider, Grid, Container, FormControlLabel, Link, Alert, } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./Styles/Theme";
import { MaterialUISwitch } from "./Styles/MaterialUISwitch";
import { NumericFormat } from "react-number-format";
import Presentation from "./Presentation";
interface MortgageData {
  binding_period_in_months: number;
  mortgage_rate: number;
}

function App() {
  const [rates, setRates] = useState<MortgageData[] | null>(null);
  const [selectedRate, setSelectedRate] = useState<number | null>(2.92);
  const [error, setError] = useState<string | null>("");
  const [inputValue, setInputValue] = useState<number>(0);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEmbeddedPresentation, setShowEmbeddedPresentation] =
    useState(false);

  const handleCompareClick = () => {
    setShowEmbeddedPresentation(true);
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchRates = async () => {
    try {
      const response = await fetch(
        "https://developer.sbab.se/sandbox/api/interest-rates/2.0/mortgage-rates",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRates(data.mortgage_rates);
        setError(null);
      } else {
        throw new Error("Failed to fetch mortgage rates");
      }
    } catch (error) {
      setError(
        "Fel vid hämtning av bolåneräntor. Vänligen försök igen senare."
      );
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      const threeMonthRate = rates.find(
        (rate) => rate.binding_period_in_months === 3
      );
      if (threeMonthRate) {
        setSelectedRate(threeMonthRate.mortgage_rate);
      }
    }
  }, [rates]);

  const convertMonthsToYears = (months: number): string => {
    const years = Math.floor(months / 12);

    if (years === 0) {
      return `${months} mån`;
    }

    return `${years} år`;
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = parseFloat(event.target.value.replace(/\s/g, ""));
    if (!isNaN(value)) {
      setInputValue(value);
    }

    if (isNaN(value) || event.target.value === "") {
      setMonthlyCost(0);
    }
  };

  useEffect(() => {
    if (
      typeof inputValue === "number" &&
      !isNaN(inputValue) &&
      selectedRate !== null
    ) {
      const convertToPercentage = parseFloat((selectedRate / 100).toFixed(4));
      const monthlyInterestRate = (inputValue * convertToPercentage) / 12;
      setMonthlyCost(monthlyInterestRate);
    }
  }, [selectedRate, inputValue]);

  return (
    <>
      {showEmbeddedPresentation ? (
        <Presentation />
      ) : (
        <>
          <Box className={isDarkMode ? "dark-mode" : "light-mode"}>
            <Container maxWidth="md">
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Typography>Dark mode</Typography>
                <FormControlLabel
                  label=""
                  control={<MaterialUISwitch sx={{ m: 1 }} />}
                  onClick={toggleMode}
                  sx={{ mr: 0 }}
                />
              </Box>

              <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <Grid container pt={5} mb={10} justifyContent={"space-between"}>
                  <Grid item md={8}>
                    <Typography variant="h1" pb={2}>
                      Din räntekostnad
                    </Typography>
                    <Typography variant="body1">
                      Här ser du både våra aktuella boräntor och din
                      räntekostnad per månad
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Box
                      className="container"
                      sx={{ visibility: { xs: "hidden", md: "visible" } }}
                    >
                      <Box className="item"></Box>
                      <Box className="item2"></Box>
                      <Box className="item3"></Box>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="h2">
                  Få fram din räntekostnad direkt
                </Typography>
                <Divider />

                <Grid container spacing={2} pt={4} maxWidth={400}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Önskat lånebelopp
                    </Typography>
                    <NumericFormat
                      value={inputValue === 0 ? "" : inputValue}
                      thousandSeparator=" "
                      suffix=" kr"
                      customInput={OutlinedInput}
                      onChange={handleInputChange}
                      allowNegative={false}
                      allowLeadingZeros={false}
                      fullWidth
                      decimalScale={0}
                      size="small"
                      sx={{ borderRadius: 0 }}
                    />
                  </Grid>

                  {rates && (
                    <>
                      <Grid item xs={12} mt={2} pb={4}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          Välj bindningstid
                        </Typography>
                        <Select
                          value={selectedRate}
                          onChange={(e) =>
                            setSelectedRate(
                              parseFloat(e.target.value as string)
                            )
                          }
                          fullWidth
                          size="small"
                          sx={{ borderRadius: 0 }}
                        >
                          {rates.map((rate, index) => (
                            <MenuItem key={index} value={rate.mortgage_rate}>
                              {convertMonthsToYears(
                                rate.binding_period_in_months
                              )}{" "}
                              - {rate.mortgage_rate}%
                            </MenuItem>
                          ))}
                        </Select>
                        {error && <Alert severity="error">{error}</Alert>}
                      </Grid>
                    </>
                  )}
                </Grid>

                {monthlyCost > 0 && (
                  <>
                    <Typography variant="h2" mt={5}>
                      Din räntekostnad -{" "}
                      {selectedRate !== null ? selectedRate.toFixed(2) : ""}%
                    </Typography>
                    <Divider />
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant="h1">
                        <NumericFormat
                          value={monthlyCost.toFixed(0)}
                          thousandSeparator=" "
                          suffix=" kr/mån"
                          allowNegative={false}
                          displayType="text"
                        />
                      </Typography>
                      <Link onClick={handleCompareClick}>
                        <img src="Compare.svg" alt="Compare" />
                      </Link>
                    </Box>
                  </>
                )}
              </ThemeProvider>
            </Container>
          </Box>
        </>
      )}
    </>
  );
}

export default App;
