const moment = require('moment')
const date = moment().add(90,'days').calendar()
const createdAt = moment().calendar()
let tasks;
exports.up = function(knex) {
  return (
    knex.schema
      //USERS
      .createTable("users", tbl => {
        //USERS TABLE
        tbl.increments();

        tbl
          .string("email")
          .unique()
          .notNullable();
        tbl.string("name").notNullable();
        tbl.string("password").notNullable();
        tbl.string("phone_number").notNullable();
       
      })
    
    
    
    
    //PROJECTS
      .createTable("projects", tbl => {
        tbl.increments();

        tbl
          .string("project_name")
          .unique()
          .notNullable();
        tbl.float("baths");
        tbl.float("beds");
        tbl.string("city");
        tbl.string("imageURL");
        tbl.integer("square_ft");
        tbl.string("state");
        tbl.string("status");
        tbl.string("street_address");
        tbl.integer("zip_code").notNullable();
        tbl.integer("latitude");
        tbl.integer("longitude");
        tbl.date("due_date").defaultsTo(date)
        tbl.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
      })
     

     

      //TASKS
      .createTable("tasks", tbl => {
        tbl.increments();

        tbl.string("task_name").notNullable();
        tbl.string("task_description", 1000);
        tbl.string("due_date");
        tbl.date("createdAt").defaultsTo(createdAt)
        tbl.boolean("isComplete").defaultsTo(false)
        tbl
          .integer("project_id", [])
          .unsigned()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
        //TEMPLATES
      .createTable("templates", tbl => {
       tbl.increments('id');

      tbl.string("template_name")
      tbl.enu("tasks",[{"task_number":Number},{"due_date":Date},{"task_name":String},{"isComplete":Boolean},{"createdAt":Date}])
  
      })
      //MANY-TO-MANY TABLE WITH PROJECTS AND TASKS
      .createTable("projects_tasks", tbl => {
        tbl.increments();

        tbl
          .integer("project_id")
          .unsigned()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("task_id")
          .unsigned()
          .references("id")
          .inTable("tasks")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")

  
      })

  
  );
};

exports.down = function(knex) {
  return knex.schema
    
    .dropTableIfExists("projects_tasks")
    .dropTableIfExists("templates")
    .dropTableIfExists("tasks")
  
     .dropTableIfExists("projects")
     .dropTableIfExists("users")
     

};
