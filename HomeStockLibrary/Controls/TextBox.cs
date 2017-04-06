﻿using HomeStockLibrary.Controls.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace HomeStockLibrary.Controls
{
    public class TextBox : HomeStockControlBase
    {
        public string Placeholder { get; set; }

        public string Label { get; set; }

        public string Tag { get; set; }

        public override void ValidateProperties()
        {
            Validate(ID, "ID");
            // Nothing.
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.AddAttribute("class", "hs-input-wrapper");
            writer.RenderBeginTag("div");

            RenderLabel(writer);

            if (!string.IsNullOrEmpty(Placeholder))
                writer.AddAttribute("placeHolder", Placeholder);

            writer.AddAttribute("class", "hs-input");
            writer.RenderBeginTag("input");
            writer.RenderEndTag();

            RenderTag(writer);

            writer.RenderEndTag();
        }

        protected void RenderLabel(HtmlTextWriter writer)
        {
            if (!string.IsNullOrEmpty(Label))
            {
                writer.AddAttribute("for", this.ID);
                writer.AddAttribute("class", "hs-input-label");
                writer.RenderBeginTag("label");
                writer.InnerWriter.Write(string.Format("{0}", Label));
                writer.RenderEndTag();
            }
        }

        protected void RenderTag(HtmlTextWriter writer)
        {
            if (!string.IsNullOrEmpty(Tag))
            {
                writer.AddAttribute("class", "hs-input-tag");
                writer.RenderBeginTag("span");
                writer.InnerWriter.Write(string.Format("{0}", Tag));
                writer.RenderEndTag();
            }
        }
    }
}