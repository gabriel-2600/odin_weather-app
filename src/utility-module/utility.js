const tempCategory = {
  currentSystem: "metric",
  changeSystem() {
    if (this.currentSystem === "metric") {
      this.currentSystem = "us";
    } else {
      this.currentSystem = "metric";
    }
  },
};

export { tempCategory };
