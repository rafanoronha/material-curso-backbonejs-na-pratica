namespace Treinamentos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTreinamentos_CreateTurmas : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Treinamentoes",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Nome = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Turmas",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Treinamento_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Treinamentoes", t => t.Treinamento_Id)
                .Index(t => t.Treinamento_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Turmas", new[] { "Treinamento_Id" });
            DropForeignKey("dbo.Turmas", "Treinamento_Id", "dbo.Treinamentoes");
            DropTable("dbo.Turmas");
            DropTable("dbo.Treinamentoes");
        }
    }
}
