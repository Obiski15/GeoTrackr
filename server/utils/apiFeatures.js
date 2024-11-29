class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sortBy) {
      const sortString = this.queryString.sortBy.split(",").join(" ");
      this.query = this.query.sort(sortString);
    } else {
      this.query = this.query.sort("-date");
    }
    return this;
  }
}

module.exports = APIFeatures;
