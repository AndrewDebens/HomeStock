﻿using System.Text;
using System.Runtime.Serialization;
using HomeStockLibrary.Util;
using HomeStockLibrary.Controls.ClientControls.Workers.Base;
using HomeStockLibrary.Controls.ClientControls.Base;

namespace HomeStockLibrary.Controls.ClientControls.Workers
{
    [DataContract]
    public class Worker : ScriptObject, IWorker
    {
        public override string ScriptRegionID => "HomeStock Workers";
        public override int? ScriptRegionPriority => 11;

        [DataMember(Name = "archiveId")]
        public string ArchiveID { get; set; }

        public override string RenderScript()
        {
            var script = new StringBuilder();
            script.AppendLine("var ns = HomeStock.Import(\"Business.Workers\");");
            script.AppendLine(string.Format("HomeStock.Workers.Add(new ns.Worker({0}));", JsonAssistant.Convert(this, typeof(IWorker))));
            return script.ToString();
        }

        public override void ValidateProperties()
        {
            Validate(ArchiveID, "ArchiveID");
        }
    }
}