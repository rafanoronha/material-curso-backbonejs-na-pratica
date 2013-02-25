namespace Treinamentos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddInstrutor_AddInicio_AddFim_ToTurmas : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Turmas", "Inicio", c => c.DateTime(nullable: false));
            AddColumn("dbo.Turmas", "Fim", c => c.DateTime(nullable: false));
            AddColumn("dbo.Turmas", "Instrutor_Id", c => c.Long());
            AddForeignKey("dbo.Turmas", "Instrutor_Id", "dbo.Instrutors", "Id");
            CreateIndex("dbo.Turmas", "Instrutor_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Turmas", new[] { "Instrutor_Id" });
            DropForeignKey("dbo.Turmas", "Instrutor_Id", "dbo.Instrutors");
            DropColumn("dbo.Turmas", "Instrutor_Id");
            DropColumn("dbo.Turmas", "Fim");
            DropColumn("dbo.Turmas", "Inicio");
        }
    }
}
