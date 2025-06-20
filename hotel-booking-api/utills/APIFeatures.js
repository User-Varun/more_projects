module.exports = class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["sort", "page"];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = JSON.stringify(this.queryString).split(",").join(" ");

      this.query = this.query.sort(JSON.parse(sortBy).sort);
    } else {
      this.query = this.query.sort("-rating_count");
    }

    return this;
  }
};
