export class ChatDataModel {
  constructor() {
    this.id = ""; //UUID
    this.chat_thread_id = ""; //UUID
    this.prompt = ""; //string
    this.response = ""; //string
    this.blob = null; //any. Initing to null; I don't know what a blob looks like when returned from the db. MAX 1GB.
    this.prompt_tokens = 0; //number
    this.response_tokens = 0; //number
    this.thinking_tokens = 0; //number
    this.created_date = ""; //string
  }
}

export class ChatThreadModel {
  constructor() {
    this.id = ""; //UUID
    this.title = ""; //string
    this.created_date = ""; //string
    this.updated_date = ""; //string
  }
}

export class Migrations {
  constructor() {
    this.id = "" //UUID
    this.date = ""; //string
    this.version_number = 0; //number
  }
}