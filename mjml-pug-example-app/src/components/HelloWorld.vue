<script>
export default {
  data() {
    return {
      template: `mjml
  mj-head
    mj-title
    mj-attributes
      mj-all(font-family='"Helvetica Neue", Helvetica, Arial, sans-serif')
        mj-text(font-weight='400', font-size='16px', color='#000000', line-height='24px', font-family='"Helvetica Neue", Helvetica, Arial, sans-serif')
      mj-class(name='heading', font-weight='500', font-size='18px', align='center')
    mj-style(inline='inline')
      | .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
    mj-style(inline='inline')
      | .text-link { color: #5e6ebf }
    mj-style(inline='inline')
      | .footer-link { color: #888888 }
  mj-body(background-color='#F4F6F8', width='600px')
    mj-section(full-width='full-width', background-color='#FFF', padding-bottom='0')
      mj-column(width='100%', background-color='#FFF')
        mj-image(src='#{templateVars.appUrl}/resource/templates/logo.png', width='200px', alt='', padding='0', padding-top='20px', href='#projectRoot')
        mj-image(src='#{templateVars.appUrl}/resource/templates/header-top.png', width='600px', height='20px' alt='', padding='0', padding-top='30px')
    mj-wrapper(padding-top='0', padding-bottom='0', css-class='body-section')
      mj-section(background-color='#ffffff', padding-left='15px', padding-right='15px')
        mj-column(width='100%')
          mj-text(color='#637381', font-size='16px')
            block intro
              p Dear Sir/Madam,
          mj-text(color='#212b35', font-size='20px', font-weight='bold', mj-class='heading')
            block heading
              span 
          mj-text(color='#637381', font-size='16px', line-height='1.618')
            block body
              | Application For #{businessIdentifier} submitted on for #{now}
              | Reference is made to your application dated #{templateVars.dateTimeUtils.toPoshEnglishDate(templateVars.serviceTransaction.submittedDate)} on the above matter.
              | Please be informed that your application to #{templateVars.filingName} for #{templateVars.serviceTransaction.businessName} has been received and is currently being reviewed.
              | You will be informed of the outcome in due course.
          mj-text(color='#637381', font-size='16px', padding-bottom='30px')
            block outro
              p Yours faithfully,
              p #{templateVars.textHelper.resolve('correspondence.registrarName')} 
    mj-wrapper(full-width='full-width')
      block footer
        mj-section
          mj-column(width='100%', padding='0')
            mj-text(color= '#445566', font-size='11px', align='center', line-height='16px')
              block footerText
          mj-column(width='100%', padding-right='0')
            mj-text(color='#445566', font-size='11px', align='center', line-height='16px', font-weight='bold')
              block footerLinks
            mj-text(color='#445566', font-size='9px', align='right', line-height='12px')
              p Document ID: #{templateVars.templateCode}
`,
      preview: "",
      variables: {
        templateVars: {
          appUrl: "test",
          templateCode: "X123",
          textHelper: { resolve: () => "resolved" },
          filingName: "filing name",
          serviceTransaction: { businessName: "Fostermoore" },
          dateTimeUtils: { toPoshEnglishDate: () => "1971-1-1" },
        },
      },
      mjmlString: "",
      error: "",
    };
  },
  watch: {
    template() {
      this.compile();
    },
  },
  methods: {
    compile() {
      const compiledFunction = pug.compile(this.template, {pretty: true});
      try {
        const mjmlString = compiledFunction(this.variables);
        this.mjmlString = mjmlString;
        const html = mjml(mjmlString, {
          beautify: true,
        });
        console.log(html.html);
        this.preview = html.html;
        this.error = ""
      } catch (e) {
        this.error = e;
      }
    },
  },
};

import mjml from "mjml-browser";
import pug from "pug";
</script>

<template>
  <h2>Pug mjml example</h2>
  <h3>Pug</h3>
  <textarea
    type="text"
    name="tempalte"
    id="template"
    v-model="template"
    cols="150"
    rows="15"
  ></textarea>
  <h3>mjml</h3>
  <textarea
    name="mjml"
    id="mjml"
    cols="150"
    rows="15"
    readonly
    :value="mjmlString"
  ></textarea>
  <h3>html</h3>
  <textarea
    name="preview"
    id="preview"
    cols="150"
    rows="15"
    readonly
    :value="preview"
  ></textarea>
  <p></p>
  <span v-html="preview"></span>
  {{ error }}
</template>

<style scoped></style>
