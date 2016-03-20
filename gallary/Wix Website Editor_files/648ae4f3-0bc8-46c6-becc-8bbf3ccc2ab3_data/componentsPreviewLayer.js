define("componentsPreviewLayer/skinsRenderPlugins/showCompOnTopRenderPlugin",[],function(){"use strict";return function(b,c,d,e){if(e.siteData.compsToShowOnTop&&e.siteData.compsToShowOnTop.indexOf(e.id)>-1){var f=Math.pow(2,31)-1;b[""].style.zIndex=f}}}),define("componentsPreviewLayer/skinsRenderPlugins/hideTextComponentPlugin",[],function(){"use strict";return function(b,c,d,e){e.siteData.hideTextComponent&&e.id===e.siteData.hideTextComponent&&(b[""].style.visibility="hidden")}}),define("componentsPreviewLayer/skinsRenderPlugins/hideCompsRendererPlugin",[],function(){"use strict";return function(b,c,d,e){e.siteData.compsToHide&&e.siteData.compsToHide.indexOf(e.id)>-1&&(b[""].style.visibility="hidden")}}),define("componentsPreviewLayer/skinsRenderPlugins/showCompWithOpacityRenderPlugin",["lodash"],function(a){"use strict";return function(c,d,e,f){var g=f.siteData.compsToShowWithOpacity;g&&g.compIds&&g.compIds.indexOf(e.id)>-1&&a.set(c,["","style","opacity"],g.opacity)}}),define("componentsPreviewLayer/previewExtensions/mixinExtensions/componentRenderPreviewExtension",["lodash","core"],function(a,b){"use strict";function c(a,b,c,d){return a&&c&&(!b||d)}function d(b,c){var d=b.split(" ");return a.includes(d,c)?b:(d.push(c),d.join(" "))}var e={transformRefStyle:function(b){var d=a.get(this.props,"structure.layout.fixedPosition"),e=a.get(this.props,"compProp.isHidden"),f=a.get(this.props,"siteData.renderFlags"),g=f.allowShowingFixedComponents,h=f.showHiddenComponents;!d||e||g?c(e,d,h,g)&&delete b.visibility:b.visibility="hidden"},transformRefClasses:function(b){var e=a.get(this.props,"structure.layout.fixedPosition"),f=a.get(this.props,"compProp.isHidden"),g=a.get(this.props,"siteData.renderFlags"),h=g.allowShowingFixedComponents,i=g.showHiddenComponents,j=a.includes(g.ignoreComponentsHiddenProperty,this.props.id);return!j&&c(f,e,i,h)?d(b,"hidden-comp-ghost-mode"):b}};return{extension:e,mixin:b.compMixins.skinBasedComp}}),define("componentsPreviewLayer/previewExtensions/backToTopButtonPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";var c="wysiwyg.common.components.backtotopbutton.viewer.BackToTopButton",d=b.registrar,e={transformRefData:function(b){if(!this.props.siteData.renderFlags.isBackToTopButtonAllowed){var c={"":{style:{display:"none"}}};a.merge(b,c)}}};d.registerCompExtension(c,e)}),define("componentsPreviewLayer/previewExtensions/helpers/previewModifications",["react","previewExtensionsCore"],function(a,b){"use strict";var c="onClick",d=b.hooks;return{createBlockLayer:function(b,f,g){var h={style:{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",cursor:"pointer"},className:"blockLayer"};f&&(g=g||c,h.onClick=function(a){var b=d.getHookFn(f,g);b&&b(a)});var i=a.DOM.div(h);b[""]=b[""]||{},b[""].addChildren=b[""].addChildren||[],b[""].addChildren.push(i)}}}),define("componentsPreviewLayer/previewExtensions/facebookLikePreviewExtension",["utils","previewExtensionsCore","componentsPreviewLayer/previewExtensions/helpers/previewModifications"],function(a,b,c){"use strict";function h(a){var b=this.props.siteData.previewTooltipCallback;b(a.target.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}function i(b){var c=a.urlUtils.parseUrl(b.iframe.src);delete c.search,c.query.href="http://www.wix.com/create/website",b.iframe.src=a.urlUtils.buildFullUrl(c)}var d="wysiwyg.viewer.components.WFacebookLike",e=b.hooks,f=b.registrar,g=[e.HOOK_NAMES.ON_CLICK],j={transformRefData:function(a){this.props.siteData.renderFlags.isSocialInteractionAllowed||(c.createBlockLayer(a,d),i(a),a[""].onClick=h.bind(this))}};f.registerCompExtension(d,j),e.registerSupportedHooks(d,g)}),define("componentsPreviewLayer/previewExtensions/facebookSharePreviewExtension",["previewExtensionsCore","componentsPreviewLayer/previewExtensions/helpers/previewModifications"],function(a,b){"use strict";function g(a){var b=this.props.siteData.previewTooltipCallback;b(a.target.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}var c="wysiwyg.viewer.components.FacebookShare",d=a.hooks,e=a.registrar,f=[d.HOOK_NAMES.ON_CLICK],h={transformRefData:function(a){this.props.siteData.renderFlags.isSocialInteractionAllowed||(b.createBlockLayer(a,c),a[""]=a[""]||{},a[""].style=a[""].style||{},a[""].style.width="auto",a[""].onClick=g.bind(this))}};e.registerCompExtension(c,h),d.registerSupportedHooks(c,f)}),define("componentsPreviewLayer/previewExtensions/socialComponentsPreviewExtension",["lodash","previewExtensionsCore","componentsPreviewLayer/previewExtensions/helpers/previewModifications"],function(a,b,c){"use strict";function h(a){var b=this.props.siteData.previewTooltipCallback;b(a.target.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}function i(a){return{transformRefData:function(b){this.props.siteData.renderFlags.isSocialInteractionAllowed||(c.createBlockLayer(b,a),b[""].onClick=h.bind(this))}}}var d=["wysiwyg.common.components.exitmobilemode.viewer.ExitMobileMode","wysiwyg.viewer.components.WFacebookComment","wysiwyg.viewer.components.ItunesButton","wysiwyg.viewer.components.PayPalButton","wysiwyg.common.components.pinterestpinit.viewer.PinterestPinIt","wysiwyg.viewer.components.VKShareButton","wysiwyg.viewer.components.WGooglePlusOne","wysiwyg.viewer.components.WTwitterFollow","wysiwyg.viewer.components.WTwitterTweet","wysiwyg.common.components.youtubesubscribebutton.viewer.YouTubeSubscribeButton"],e=b.hooks,f=b.registrar,g=[e.HOOK_NAMES.ON_CLICK];a.forEach(d,function(a){f.registerCompExtension(a,i(a)),e.registerSupportedHooks(a,g)})}),define("componentsPreviewLayer/previewExtensions/slideShowGalleryPreviewExtension",["react","lodash","previewExtensionsCore"],function(a,b,c){"use strict";function e(b,c){var d=c+"/static/images/slideshowGallery/ico_slide.png",e=a.DOM.div({style:{position:"absolute",top:"50%",left:"0",width:"100%",marginTop:"-18px",textAlign:"center"},className:"slideShowClickBlocker",children:[a.DOM.b({className:"slideShowClickBlocker",style:{display:"inline-block",borderRadius:"3px",background:"#222 url("+d+") no-repeat 8px 50%",opacity:"0.6",color:"#ffffff",padding:"0 14px 0 66px",whiteSpace:"nowrap",height:"38px",lineHeight:"39px",fontSize:"12px",position:"static",width:"auto"},children:["Slide Show"]})]});b[""].addChildren=b[""].addChildren||[],b[""].addChildren.push(e)}var d=c.registrar,f={getButtonsState:function(){return{$editMode:this.props.siteData.renderFlags.isSlideShowGalleryClickAllowed?"":"showButtons"}},transformRefData:function(a){this.props.siteData.renderFlags.isSlideShowGalleryClickAllowed||(a[""]=a[""]||{},e(a,this.props.siteData.santaBase))},resetGalleryState:function(){var a=this.getInitialState();this.registerReLayout(),this.setState(a)}};d.registerCompExtension("wysiwyg.viewer.components.SlideShowGallery",f)}),define("componentsPreviewLayer/previewExtensions/translations/tpaExtensionTranslations",[],{de:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},en:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},es:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},fr:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},it:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},ja:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},ko:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},pl:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},ru:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},nl:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},tr:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},sv:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},pt:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},no:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},da:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},hi:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"},zh:{TPA_PRELOADER_LOADING:"Loading",tpa_unavail_problems:"We\\&#39;re sorry, <b><%= appName %></b> is experiencing problems. Please give it a try later, or contact",tpa_unavail_problems_2:"for help.",tpa_oops:"Oops! Something Went Wrong"}}),define("componentsPreviewLayer/previewExtensions/tpaUnavailableMessageOverlayPreviewExtension",["lodash","react","previewExtensionsCore","componentsPreviewLayer/previewExtensions/translations/tpaExtensionTranslations"],function(a,b,c,d){"use strict";var e="wysiwyg.viewer.components.tpapps.TPAUnavailableMessageOverlay",f=c.registrar,g={transformRefData:function(c){if("unresponsive"===this.props.compData.overlay){var d=2,e=this.props.compData.style.width-2*d,f=Math.max(0,e),g=Math.floor(.1*f),i=45,j=f-2*g,o="100%",p=this.props.siteData.rendererModel.languageCode,q={"":{style:{display:"table"}},content:{style:{display:"table-cell",verticalAlign:"middle",paddingLeft:"24px",paddingRight:"24px",width:j}},textTitle:{children:n(p,"tpa_oops")},text:{children:[b.createElement("span",{dangerouslySetInnerHTML:{__html:k(this.props.siteData,this.props.compData.applicationId,p)}}),h(this.props.siteData,this.props.compData.applicationId,c.openHelp),b.createElement("span",{}," "+n(p,"tpa_unavail_problems_2"))]},img:{style:{marginLeft:"0px !important"}},unavailableIcon:{src:this.props.siteData.santaBase+"/static/images/tpaPreloader/alert-icon.png"}},r=m();this.props.compData.style.width>175&&(o=j-i,r=l(this.props,o)),a.merge(q,r),a.merge(c,q)}}},h=function(a,c,d){var e=i(a,c),f=j(a,c);return b.createElement("a",{href:"#",onClick:function(a,b,c){c.stopPropagation(),b(a)}.bind(null,e,d)},f)},i=function(a,b){var c=a.getClientSpecMapEntry(b);return c.appDefinitionId},j=function(a,b){var c=a.getClientSpecMapEntry(b);return c.appDefinitionName},k=function(b,c,d){var e=j(b,c),f=a.template(n(d,"tpa_unavail_problems"));return" "+f({appName:e})+" "},l=function(){return{textContainer:{style:{verticalAlign:"baseline",display:"block",boxSizing:"border-box","float":"left",textAlign:"left",color:"#7a92a5",fontWeight:"300",fontSize:"13px"}},textTitle:{style:{display:"block",color:"#2b5672",fontSize:"14px",fontWeight:"300",lineHeight:"14px","float":"left"}},iconContainer:{style:{width:45,boxSizing:"border-box",display:"block",marginBottom:14,marginTop:14}}}},m=function(){return{textContainer:{style:{textAlign:"center",display:"block"}},iconContainer:{style:{display:"block",textAlign:"center"}}}},n=function(a,b){return d[a]&&d[a][b]?d[a][b]:d.en[b]};f.registerCompExtension(e,g)}),define("componentsPreviewLayer/previewExtensions/tpaPreloaderOverlayExtension",["lodash","react","previewExtensionsCore","componentsPreviewLayer/previewExtensions/translations/tpaExtensionTranslations"],function(a,b,c,d){"use strict";var e="wysiwyg.viewer.components.tpapps.TPAPreloaderOverlay",f=c.registrar,g={transformRefData:function(b){var c=this.props.siteData.rendererModel.clientSpecMap,d=this.props.compData.applicationId,e=c&&c[d]?c[d].appDefinitionName:"",f=this.props.siteData.rendererModel.languageCode,g=this.props.compData.style.height,i={content:{style:{textAlign:"center",fontSize:"13px"}},preloader:{style:{marginTop:"-45px"}},loadingText:{style:{lineHeight:g+"px"},children:h(f,"TPA_PRELOADER_LOADING")+" "+e+" ..."}};a.merge(b,i)}},h=function(a,b){return d[a]&&d[a][b]?d[a][b]:d.en[b]};f.registerCompExtension(e,g)}),define("componentsPreviewLayer/previewExtensions/tpaModalExtension",["lodash","react","previewExtensionsCore"],function(a,b,c){"use strict";var d="wysiwyg.viewer.components.tpapps.TPAModal",e=c.registrar,f={transformRefData:function(b){if("mobile"===this.state.$displayDevice){var c={frameWrap:{style:{overflowY:"none",width:319,height:512}},dialog:{style:{position:"relative"}}};a.merge(b,c)}}};e.registerCompExtension(d,f)}),define("componentsPreviewLayer/previewExtensions/tpaPopupExtension",["lodash","react","previewExtensionsCore"],function(a,b,c){"use strict";var d="wysiwyg.viewer.components.tpapps.TPAPopup",e=c.registrar,f={transformRefData:function(b){if("0%"!==this.props.compData.width&&"0%"!==this.props.compData.height&&"0"!==this.props.compData.width&&"0"!==this.props.compData.height&&"mobile"===this.state.$displayDevice){var c={"":{style:{position:"absolute",width:319,height:512,marginLeft:0,marginTop:0,boxShadow:"none",left:0,top:0}}};a.merge(b,c)}}};e.registerCompExtension(d,f)}),define("componentsPreviewLayer/previewExtensions/tpaCompsExtension",["lodash","previewExtensionsCore","utils"],function(a,b,c){"use strict";var d=["wysiwyg.viewer.components.tpapps.TPAWidget","wysiwyg.viewer.components.tpapps.TPASection","wysiwyg.viewer.components.tpapps.TPAGluedWidget","wysiwyg.viewer.components.tpapps.TPAMultiSection"],e=b.registrar,f={setOverlayState:function(){var a=this.isUnderMobileView()&&this.isMobileReady&&!this.isMobileReady(),b=a?"unavailableInMobile":"preloader";this.state.isAlive||this.state.overlay&&"unresponsive"===this.state.overlay||this.setState({overlay:b})},resize:function(b){var c={};this.state&&b.style.height===this.state.height&&this.state.height&&(c.height=void 0),this.state&&b.style.width===this.state.width&&this.state.width&&(c.width=void 0),a.isEmpty(c)||this.setState(c)},isInMobileDevMode:function(){var b=c.urlUtils.parseUrl(this.getEditorUrl()),d=this.isUnderMobileView(),e=b.query.appDefinitionId,f=this.getAppData();return d&&e&&a.includes(e,f.appDefinitionId)},getEditorUrl:function(){return window.parent.location.href}};a.forEach(d,function(a){e.registerCompExtension(a,f)})}),define("componentsPreviewLayer/previewExtensions/fixedPositionContainerPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";var c="wysiwyg.viewer.components.FooterContainer",d="wysiwyg.viewer.components.HeaderContainer",e="wysiwyg.viewer.components.mobile.TinyMenu",f=b.registrar,g={getTransformedCssStates:function(){if(this.props.siteData.renderFlags.renderFixedPositionContainers)return this.state;var b=a.omit(this.state,"$fixed");return b},getRootPosition:function(a){return this.props.siteData.renderFlags.renderFixedPositionContainers?a.position:"absolute"}};f.registerCompExtension(c,g),f.registerCompExtension(d,g),f.registerCompExtension(e,g)}),define("componentsPreviewLayer/previewExtensions/mobileImageZoomDisplayerPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";function c(b,c,d){b[c]=b[c]||{},b[c].style=a.assign({},b[c].style,{position:d})}var d="wysiwyg.components.MobileImageZoomDisplayer",e=b.registrar,f={transformRefData:function(a){this.props.siteData.renderFlags.renderFixedPositionContainers&&(c(a,"","initial"),c(a,"panel","absolute"),c(a,"gradient","absolute"))}};e.registerCompExtension(d,f)}),define("componentsPreviewLayer/previewExtensions/mobileMediaZoomPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";function c(b,c){b[c].style=a.assign({},b[c].style,{position:"absolute"})}var d="wysiwyg.viewer.components.MobileMediaZoom",e=b.registrar,f={transformRefData:function(b){if(this.props.siteData.renderFlags.renderFixedPositionContainers){var d=this.props.siteData.getSiteWidth();b.blockingLayer=b.blockingLayer||{},b.blockingLayer.style=a.assign({},b.blockingLayer.style,{width:d,height:"100vh",marginLeft:"calc(50% - "+d/2+"px)"}),c(b,"xButton"),c(b,"buttonPrev"),c(b,"buttonNext")}}};e.registerCompExtension(d,f)}),define("componentsPreviewLayer/previewExtensions/blockSiteMembersPreviewExtension",["utils","lodash","previewExtensionsCore"],function(a,b,c){"use strict";var d=["wysiwyg.viewer.components.dialogs.EnterPasswordDialog","wysiwyg.viewer.components.dialogs.siteMemberDialogs.SignUpDialog","wysiwyg.viewer.components.dialogs.siteMemberDialogs.MemberLoginDialog","wysiwyg.viewer.components.dialogs.siteMemberDialogs.RequestPasswordResetDialog","wysiwyg.viewer.components.dialogs.siteMemberDialogs.ResetPasswordDialog","wysiwyg.viewer.components.dialogs.NotificationDialog"],e=c.registrar,f={blockSubmit:function(a){if(!this.props.siteData.renderFlags.isExternalNavigationAllowed){var b=this.props.siteData.previewTooltipCallback;b(a.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}},isPasswordProtectedDialog:function(){return"enterPassword"===this.props.siteAPI.getSiteAspect("siteMembers").dialogToDisplay},shouldBlockSubmit:function(){return!this.props.siteData.renderFlags.isExternalNavigationAllowed&&!this.isPasswordProtectedDialog()},transformRefData:function(a){this.props.siteData.renderFlags.isExternalNavigationAllowed||(a[""]=a[""]||{},a[""].style=b.assign({},a[""].style,{overflow:"hidden"}),a.blockingLayer.style=b.assign({},a.blockingLayer.style,{position:"absolute"}))}};b.forEach(d,function(a){e.registerCompExtension(a,f)})}),define("componentsPreviewLayer/previewExtensions/matrixGalleryPreviewExtension",["previewExtensionsCore"],function(a){"use strict";var b="wysiwyg.viewer.components.MatrixGallery",c=a.registrar,d={resetGalleryState:function(){var a=this.getInitialState();this.registerReLayout(),this.setState(a)}};c.registerCompExtension(b,d)}),define("componentsPreviewLayer/previewExtensions/subscribeFormPreviewExtension",["utils","zepto","lodash","previewExtensionsCore"],function(a,b,c,d){"use strict";var e=["wysiwyg.common.components.subscribeform.viewer.SubscribeForm"],f=d.registrar,g={blockSubmit:function(a){if(!this.props.siteData.renderFlags.isExternalNavigationAllowed){var b=this.props.siteData.previewTooltipCallback;b(a.getBoundingClientRect(),"PREVIEW_TOOLTIP_SUBSCRIBE")}},shouldBlockSubmit:function(){return!this.props.siteData.renderFlags.isExternalNavigationAllowed}};c.forEach(e,function(a){f.registerCompExtension(a,g)})}),define("componentsPreviewLayer/bi/errors.json",[],function(){return{CONTACT_FORM_EMAIL_DECRYPT_FAILURE:{errorCode:21052,severity:"warning",params:{p1:"dataFieldName",p2:"originalMail",p3:"errorMsg"}}}}),define("componentsPreviewLayer/bi/errors",["componentsPreviewLayer/bi/errors.json","lodash","utils"],function(a,b,c){"use strict";var d=c.logger;return b.forEach(a,function(a,b){a.errorName=b}),d.register("componentsPreviewLayer","error",a),a}),define("componentsPreviewLayer/previewExtensions/formPreviewDataRequirementsChecker",["lodash","core","utils","componentsPreviewLayer/bi/errors"],function(a,b,c,d){"use strict";function f(a){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)}function g(b,c,d){var e=a.template("/html/email/decrypt/<%=email%>/<%=siteId%>");return"//"+b+e({email:d,siteId:c})}function h(a,b,e){c.logger.reportBI(a,d.CONTACT_FORM_EMAIL_DECRYPT_FAILURE,{dataFieldName:b,originalMail:e,errorMsg:"Server could not decrypt user email"})}function i(b,c,d){var e=["requests",d.pageId,d.data.id],i=["pagesData",d.pageId,"data","document_data",d.data.id],j=a.get(d,["data",c]);return!a.isEmpty(j)&&!f(j.trim())&&!a.has(b,e)&&{url:g(b.currentUrl.host,b.siteId,j),destination:i.concat(c),force:!0,error:function(d,f){a.set(b,e,{error:d,response:f}),h(b,c,j)},timeout:1,transformFunc:function(c){return a.set(b,e,"success"),a.get(c,"payload.email")}}}function j(b,c){return a.compact([i(b,"toEmailAddress",c),i(b,"bccEmailAddress",c)])}var e=b.dataRequirementsChecker;return e.registerCheckerForCompType("wysiwyg.viewer.components.ContactForm",j),e.registerCheckerForCompType("wysiwyg.common.components.subscribeform.viewer.SubscribeForm",j),{formRequestGetter:j}}),define("componentsPreviewLayer/previewExtensions/appPartPreviewExtension",["lodash","previewExtensionsCore","wixappsClassics"],function(a,b){"use strict";function d(){this.viewName_=this.props.compData.viewName,this.customizationsCount_=this.props.compData.appLogicCustomizations.length,this.appLogicCustomizations_=this.props.compData.appLogicCustomizations}var c="wixapps.integration.components.AppPart",e={componentDidUpdate:function(){d.call(this)},componentDidMount:function(){d.call(this)},isChanged:function(b){return this.viewName_!==b.compData.viewName||this.customizationsCount_!==b.compData.appLogicCustomizations.length||!a.isEqual(this.appLogicCustomizations_,b.compData.appLogicCustomizations)}};b.registrar.registerCompExtension(c,e)}),define("componentsPreviewLayer/previewExtensions/appPart2PreviewExtension",["lodash","previewExtensionsCore","wixappsBuilder"],function(a,b){"use strict";function d(){var b=this.getAppPartDefinition(),c=this.getViewDef(b.viewName,"Array",this.getFormatName());return a.cloneDeep(c.vars)}var c="wixapps.integration.components.AppPart2",e={isChanged:function(){var b=d.call(this),c=!a.isEqual(this.viewVars,b);return this.viewVars=b,c}};b.registrar.registerCompExtension(c,e)}),define("componentsPreviewLayer/previewExtensions/wixCodeWidgetPreviewExtension",["lodash","previewExtensionsCore","wixCode"],function(a,b,c){"use strict";var d="wysiwyg.viewer.classes.wixCode.WixCodeWidget",e=c.wixCodeClientSpecMapService,f={componentWillMount:function(){this.codeVersion="dev"},componentDidUpdate:function(a){var b=this.props.siteAPI.getSiteAspect("WidgetAspect"),c=this.props.siteAPI.getSiteData().getClientSpecMap(),d=e.getWidgetInstanceId(c),f=e.getHandlerId(c),g=this.props.siteAPI.getCurrentPageId(),h=b.getWidgetHandler(f);if(this.wixCodeInitiated&&!a.siteData.renderFlags.initWixCode&&h.stopWidget(d),!this.props.siteData.renderFlags.initWixCode)return void(this.wixCodeInitiated=!1);if(!this.wixCodeInitiated){this.wixCodeInitiated=!0;var i=b.getWidgetComponents(d,g);h.initWidgets(g,i,d)}}};b.registrar.registerCompExtension(d,f)}),define("componentsPreviewLayer/previewExtensions/wixAdsDesktopPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";var c="wysiwyg.viewer.components.WixAdsDesktop",d={onPreviewAdClick:a.noop};b.registrar.registerCompExtension(c,d)}),define("componentsPreviewLayer/previewExtensions/wixAdsMobilePreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";var c="wysiwyg.viewer.components.WixAdsMobile",d={onClickOverridenHandler:function(){}};b.registrar.registerCompExtension(c,d)}),define("componentsPreviewLayer/previewExtensions/homePageLoginPreviewExtension",["utils","previewExtensionsCore","componentsPreviewLayer/previewExtensions/helpers/previewModifications"],function(a,b,c){"use strict";function h(a){var b=this.props.siteData.previewTooltipCallback;b(a.target.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}var d="wysiwyg.viewer.components.wixhomepage.HomePageLogin",e=b.hooks,f=b.registrar,g=[e.HOOK_NAMES.ON_CLICK],i={transformRefData:function(a){this.props.siteData.renderFlags.isExternalNavigationAllowed||(c.createBlockLayer(a,d),a[""].onClick=h)}};"undefined"!=typeof window&&window.queryUtil&&window.queryUtil.isParameterTrue("iswixsite")&&(f.registerCompExtension(d,i),e.registerSupportedHooks(d,g))}),define("componentsPreviewLayer/previewExtensions/formPreviewExtension",["previewExtensionsCore"],function(a){"use strict";var b={getDefaultProps:function(){return{ignoreActivityReport:!0}}};a.registrar.registerCompExtension("wysiwyg.viewer.components.ContactForm",b),a.registrar.registerCompExtension("wysiwyg.common.components.subscribeform.viewer.SubscribeForm",b)}),define("componentsPreviewLayer/previewExtensions/wixappsProxies/mediaLabelProxyPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";b.registrar.registerProxyExtension("MediaLabel",{isViewDefCompChangedInNextProps:function(b){return!a.isEqual(this.props.viewDef.comp,b.viewDef.comp)}})}),define("componentsPreviewLayer/previewExtensions/wixappsProxies/previewExtensions",["previewExtensionsCore","componentsPreviewLayer/previewExtensions/wixappsProxies/mediaLabelProxyPreviewExtension"],function(a){"use strict";a.registrar.extendProxyClasses()}),define("componentsPreviewLayer/previewExtensions/wixappsLogics/singlePostPageLogicPreviewExtension",["lodash","previewExtensionsCore"],function(a,b){"use strict";function c(a){var b=this.partApi.getSiteData().previewTooltipCallback;b(a.target.getBoundingClientRect(),"PREVIEW_TOOLTIP_GOTO_LIVE_SITE")}function d(){return!0}b.registrar.registerLogicExtension("ea63bc0f-c09f-470c-ac9e-2a408b499f22",{sharePost:c,isReady:d})}),define("componentsPreviewLayer/previewExtensions/wixappsLogics/logicPreviewExtensions",["previewExtensionsCore","componentsPreviewLayer/previewExtensions/wixappsLogics/singlePostPageLogicPreviewExtension"],function(a){"use strict";a.registrar.extendLogicClasses()}),define("componentsPreviewLayer",["previewExtensionsCore","skins","componentsPreviewLayer/skinsRenderPlugins/showCompOnTopRenderPlugin","componentsPreviewLayer/skinsRenderPlugins/hideTextComponentPlugin","componentsPreviewLayer/skinsRenderPlugins/hideCompsRendererPlugin","componentsPreviewLayer/skinsRenderPlugins/showCompWithOpacityRenderPlugin","componentsPreviewLayer/previewExtensions/mixinExtensions/componentRenderPreviewExtension","componentsPreviewLayer/previewExtensions/backToTopButtonPreviewExtension","componentsPreviewLayer/previewExtensions/facebookLikePreviewExtension","componentsPreviewLayer/previewExtensions/facebookSharePreviewExtension","componentsPreviewLayer/previewExtensions/socialComponentsPreviewExtension","componentsPreviewLayer/previewExtensions/slideShowGalleryPreviewExtension","componentsPreviewLayer/previewExtensions/tpaUnavailableMessageOverlayPreviewExtension","componentsPreviewLayer/previewExtensions/tpaPreloaderOverlayExtension","componentsPreviewLayer/previewExtensions/tpaModalExtension","componentsPreviewLayer/previewExtensions/tpaPopupExtension","componentsPreviewLayer/previewExtensions/tpaCompsExtension","componentsPreviewLayer/previewExtensions/fixedPositionContainerPreviewExtension","componentsPreviewLayer/previewExtensions/mobileImageZoomDisplayerPreviewExtension","componentsPreviewLayer/previewExtensions/mobileMediaZoomPreviewExtension","componentsPreviewLayer/previewExtensions/blockSiteMembersPreviewExtension","componentsPreviewLayer/previewExtensions/matrixGalleryPreviewExtension","componentsPreviewLayer/previewExtensions/subscribeFormPreviewExtension","componentsPreviewLayer/previewExtensions/formPreviewDataRequirementsChecker","componentsPreviewLayer/previewExtensions/appPartPreviewExtension","componentsPreviewLayer/previewExtensions/appPart2PreviewExtension","componentsPreviewLayer/previewExtensions/wixCodeWidgetPreviewExtension","componentsPreviewLayer/previewExtensions/wixAdsDesktopPreviewExtension","componentsPreviewLayer/previewExtensions/wixAdsMobilePreviewExtension","componentsPreviewLayer/previewExtensions/homePageLoginPreviewExtension","componentsPreviewLayer/previewExtensions/formPreviewExtension","componentsPreviewLayer/previewExtensions/wixappsProxies/previewExtensions","componentsPreviewLayer/previewExtensions/wixappsLogics/logicPreviewExtensions"],function(a,b,c,d,e,f,g){"use strict";return b.registerRenderPlugin(c),b.registerRenderPlugin(d),b.registerRenderPlugin(e),b.registerRenderPlugin(f),a.registrar.registerMixinExtension(g.mixin,g.extension),a.registrar.extendCompMixinClasses(),a.registrar.extendCompClasses(),{previewExtensionsHooks:a.hooks}});