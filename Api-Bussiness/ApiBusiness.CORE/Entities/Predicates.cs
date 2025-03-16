using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public class Predicates
    {

        public class PredictionField
        {
            public string Label { get; set; }
            public string Ocr_text { get; set; }

        }

        public class PredictionResponse
        {
            public string Message { get; set; }
            public List<PredictionData> Result { get; set; }
        }

        public class PredictionData
        {
            public List<PredictionField> Prediction { get; set; }
        }
    }
}
