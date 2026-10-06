import{j as e}from"./jsx-runtime-BlmfKJmv.js";import{a as M,M as w,b as g,B as j,S as B,g as O,A as T,c as f}from"./index-Bu2ubLhk.js";import{c as P}from"./modes-en-COXyOP-9.js";import{t as W}from"./trimet-styled-BvYeqXS2.js";import{g as D,h as R,i as U,G as Y,C as N}from"./query-params-i18n-B9_Yuarq.js";import{D as L,a as I}from"./AdvancedModeSubsettingsContainer-P8s4us_a.js";import{M as n,a as _,b as E}from"./index-BVo3X-k5.js";import"./polyline-Ba8S-n1u.js";import"./index-BUnyW3km.js";import"./index-bsugPHvp.js";import"./iframe-92Rv6FNx.js";import"./index-0bEcdcOC.js";import"./leg-icon-DMqu4Pw3.js";import"./styled-components.browser.esm-BHG6efKi.js";import"./typeof-CY0RTpPX.js";import"./index.esm-BUqzwnxA.js";import"./index-XI4rTAFB.js";import"./preload-helper-D9Z9MdNV.js";import"./Streetcar-Bwfmc3vT.js";import"./index-Y1H0tOYO.js";import"./Alert-BWkIAAbG.js";import"./index-DRMmElRZ.js";import"./en-US-qEeFzDIJ.js";import"./toConsumableArray-Bnd270tG.js";import"./dom-query-BHOLqPPs.js";import"./trimet-mode-icon-DKQfr3U_.js";import"./suspense-NPZrMZ8Z.js";import"./uFuzzy.esm-CxIg84FE.js";import"./ExternalLinkAlt.esm-BTz9CYMo.js";import"./message-a-pQj48I.js";const F={primary:{id:"PRIMARY",title:"Primary Choice",text:e.jsxs("span",{children:[e.jsx(g,{}),e.jsx(j,{})," Primary Choice"]})},secondary:[{id:"SECONDARY1",title:"Secondary 1",text:e.jsxs("span",{children:[e.jsx(M,{})," Sec. #1"]})},{id:"SECONDARY2",title:"Secondary 2",selected:!0,showTitle:!1,text:e.jsxs("span",{children:["Sec. #2 ",e.jsx(w,{})]})}],tertiary:[{id:"OTHER",title:"Other Mode",text:e.jsx("span",{children:"Tertiary Mode"})}]},G=O("uber"),K=[{id:"BUS",title:"Use the bus",text:e.jsxs("span",{children:[e.jsx(j,{})," Bus"]})},{id:"TRAM",selected:!0,title:"Use the streetcar",text:e.jsxs("span",{children:[e.jsx(B,{})," Streetcar"]})},{id:"UBER",selected:!0,title:"Uber",text:e.jsxs("span",{children:[e.jsx(G,{})," Uber"]})}],{action:h}=__STORYBOOK_MODULE_ACTIONS__,s=h("onChange"),i=h("onClick"),C=h("onQueryParamChange"),H=t=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Plain"}),e.jsx("div",{children:e.jsx(t,{})}),e.jsx("p",{children:"Styled"}),e.jsx("div",{children:W(e.jsx(t,{}))})]});function r(t,v){const k=t.bind({});return k.args=v,k}const b=t=>e.jsx(Y,{onQueryParamChange:C,query:{mode:t.mode,otp2:t.otp2,routingType:"ITINERARY"},queryParamMessages:t.queryParamMessages,supportedModes:P}),Me={argTypes:{timeZone:{control:"select",options:["America/New_York","America/Los_Angeles"]}},component:D,decorators:[H],parameters:{controls:{hideNoControlsWarning:!0,include:["timeZone","departArriveDropdown"]}},title:"Trip Form Components"},Q={maxWalkDistance:{label:"Max Walk Distance In Meters (custom)",options:[{text:"200 m (custom)",value:200},{text:"500 m (custom)",value:500}]},optimize:{label:"Walk settings (custom)",options:[{text:"Quickest trip (custom)",value:"QUICK"},{text:"Prefer fewer transfers (custom)",value:"TRANSFERS"}]}},l=r(N,{label:"Check me.",name:"MyParam",onChange:s,style:{display:"inline-block",width:"250px"}}),o=r(R,{label:"Drag me.",labelHigh:"high",labelLow:"low",max:20,min:.5,name:"MyParam",onChange:s,step:.5,style:{display:"inline-block",width:"250px"},value:3});o.parameters={a11y:{config:{rules:[{id:"duplicate-id-active",reviewOnFail:!0}]}}};const c=r(L,{date:"2020-02-15",dateFormatLegacy:"YY-M-d",departArrive:"NOW",departArriveDropdown:!0,forceLegacy:!1,onQueryParamChange:C,time:"14:17",timeFormatLegacy:"HH:mm",timeZone:"America/New_York"}),m=r(I,{departArrive:"NOW",timeZone:"America/New_York",onQueryParamChange:C}),d=r(U,{label:"Pick an option:",name:"MyParam",onChange:s,options:[{text:"Option 1",value:"Value1"},{text:"Option 2",value:"Value2"}],style:{display:"inline-block",width:"250px"},value:"Value2"}),p=r(b,{mode:"WALK,BUS,TRAM,SUBWAY"}),a=r(b,{mode:"WALK,BUS,TRAM,SUBWAY",otp2:!0});a.parameters={a11y:{config:{rules:[{id:"duplicate-id-active",reviewOnFail:!0},{id:"duplicate-id-aria",reviewOnFail:!0}]}}};const u=r(b,{mode:"WALK,BUS,TRAM,SUBWAY",queryParamMessages:Q}),A=()=>e.jsx("span",{style:{display:"inline-block",width:"1em"}}),S=()=>e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsxs(n,{onClick:i,title:"Normal",children:[e.jsx(g,{}),"+",e.jsx(M,{}),"Go by train",e.jsx("span",{style:{fontSize:"150%",color:"#b03030"},children:" or "})," bike"]}),e.jsx(A,{}),e.jsxs(n,{selected:!0,onClick:i,title:"Active",children:[e.jsx(g,{}),"Train"]}),e.jsx(A,{}),e.jsxs(n,{enabled:!1,label:"Can't Select!",onClick:i,title:"Disabled",children:[e.jsx(T,{}),"Can't select!",e.jsx(f,{})]})]}),e.jsx("div",{children:e.jsxs(n,{onClick:i,showTitle:!1,title:"Walk Only",children:[e.jsx(g,{}),"Walk Only"]})})]}),x=()=>e.jsx(_,{modes:F,onChange:s}),y=r(E,{inline:!1,label:"Submodes:",modes:K,onChange:s});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`makeStory(Core.CheckboxSelector, {
  label: "Check me.",
  name: "MyParam",
  onChange,
  style: {
    display: "inline-block",
    width: "250px"
  }
})`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`makeStory(Core.SliderSelector, {
  label: "Drag me.",
  labelHigh: "high",
  labelLow: "low",
  max: 20,
  min: 0.5,
  name: "MyParam",
  onChange,
  step: 0.5,
  style: {
    display: "inline-block",
    width: "250px"
  },
  value: 3
})`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`makeStory(Core.DateTimeSelector, {
  date: "2020-02-15",
  dateFormatLegacy: "YY-M-d",
  departArrive: "NOW",
  departArriveDropdown: true,
  forceLegacy: false,
  onQueryParamChange,
  time: "14:17",
  timeFormatLegacy: "HH:mm",
  timeZone: "America/New_York"
})`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`makeStory(Core.DepartArriveDropdown, {
  departArrive: "NOW",
  timeZone: "America/New_York",
  onQueryParamChange
})`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`makeStory(Core.DropdownSelector, {
  label: "Pick an option:",
  name: "MyParam",
  onChange,
  options: [{
    text: "Option 1",
    value: "Value1"
  }, {
    text: "Option 2",
    value: "Value2"
  }],
  style: {
    display: "inline-block",
    width: "250px"
  },
  value: "Value2"
})`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`makeStory(GeneralSettingsTemplate, {
  mode: "WALK,BUS,TRAM,SUBWAY"
})`,...p.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`makeStory(GeneralSettingsTemplate, {
  mode: "WALK,BUS,TRAM,SUBWAY",
  otp2: true
})`,...a.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`makeStory(GeneralSettingsTemplate, {
  mode: "WALK,BUS,TRAM,SUBWAY",
  queryParamMessages
})`,...u.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`(): ReactElement => <div>
    <div>
      <Core.ModeButton onClick={onClick} title="Normal">
        <Icons.Max />
        +
        <Icons.Bike />
        Go by train
        <span style={{
        fontSize: "150%",
        color: "#b03030"
      }}> or </span> bike
      </Core.ModeButton>
      <Space />
      <Core.ModeButton selected onClick={onClick} title="Active">
        <Icons.Max />
        Train
      </Core.ModeButton>
      <Space />
      <Core.ModeButton enabled={false} label="Can't Select!" onClick={onClick} title="Disabled">
        <Icons.AlertSolid />
        Can&apos;t select!
        <Icons.Alert />
      </Core.ModeButton>
    </div>
    <div>
      <Core.ModeButton onClick={onClick} showTitle={false} title="Walk Only">
        <Icons.Max />
        Walk Only
      </Core.ModeButton>
    </div>
  </div>`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"(): ReactElement => <Core.ModeSelector modes={modeOptions} onChange={onChange} />",...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`makeStory(Core.SubmodeSelector, {
  inline: false,
  label: "Submodes:",
  modes: submodeOptions,
  onChange
})`,...y.parameters?.docs?.source}}};export{l as checkboxSelector,c as dateTimeSelector,Me as default,m as departArriveDropdown,d as dropdownSelector,p as generalSettingsPanel,u as generalSettingsPanelWithCustomMessages,a as generalSettingsPanelWithOtp2,S as modeButtons,x as modeSelector,o as sliderSelector,y as submodeSelector};
