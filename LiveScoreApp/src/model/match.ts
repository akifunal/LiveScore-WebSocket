export class Match {
  title: String;
  description: String;
  published: Boolean;

  constructor() {
    this.title = '';
    this.description = '';
    this.published = false;
  }
}


export class Name {
  title: String;
  first: String;
  last: String;

  constructor() { }
}

export class Person {
  gender: String;
  email: String;
  username: String;
  name: {
    title: String,
    first: String,
    last: String
  };
  fullName: String;

  constructor() {
    this.gender = "male";
  }
}
