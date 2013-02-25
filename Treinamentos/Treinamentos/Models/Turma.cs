using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Treinamentos.Models
{
    public class Turma
    {
        public long Id { get; set; }
        public Treinamento Treinamento { get; set; }
        public Instrutor Instrutor { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fim { get; set; }
    }
}