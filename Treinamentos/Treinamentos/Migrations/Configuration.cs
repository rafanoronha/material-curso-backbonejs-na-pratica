namespace Treinamentos.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Treinamentos.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Treinamentos.Models.TreinamentosContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Treinamentos.Models.TreinamentosContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Instrutors.AddOrUpdate(
                x => x.Nome,
                new Instrutor { Nome = "Rafa Noronha" },
                new Instrutor { Nome = "Breno Ferreira" },
                new Instrutor { Nome = "Victor Cavalcante" },
                new Instrutor { Nome = "Giovanni Bassi" }
                );
        }
    }
}
