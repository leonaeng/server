window.openwebFeedbackModal=function(){return{isOpen:!1,feedbackUrl:"",init:function(){_self=this,document.addEventListener("openweb-reactions-voted",(function(e){let o,d,t=e.detail.votedReaction;switch(window.template){case"article-page":o="https://docs.google.com/forms/d/e/1FAIpQLSfsuJOPfDYqUlNEjb5kEYnpZoIVD1v2KicRlnRUOGaEV3PUUw/viewform?embedded=true",d="https://docs.google.com/forms/d/e/1FAIpQLSfntCKjK43-unX-DwuWBz95ut_GKI7H6P7__7y5KETihLmTxA/viewform?embedded=true";break;case"roundup-page":o="https://docs.google.com/forms/d/e/1FAIpQLScay9sMGy3fhmb5mOoBd_imbcrIClM5JJ22YWT_pSznF8lEQg/viewform?embedded=true",d="https://docs.google.com/forms/d/e/1FAIpQLSdk__gfg54sEuSV8uhSuK2Fkzc3iQa2Euow2ytovWIJonYYVw/viewform?embedded=true";break;case"review-page":o="https://docs.google.com/forms/d/e/1FAIpQLSdlLDMEO1Nid-etQxv3KnwWZj0HgFPK_NHP1Mqt7tu81v2BLw/viewform?embedded=true",d="https://docs.google.com/forms/d/e/1FAIpQLSee93MmifSQu3C0gcP8ZncWEdqh7UCZtq9ZtGxvpcZL4-wHUA/viewform?embedded=true";break;default:o="https://docs.google.com/forms/d/e/1FAIpQLSeF2_JZd4otrNO5X7sivbab4b0YtdQcv86CtHyLt1Ga0nR6Fw/viewform?embedded=true",d="https://docs.google.com/forms/d/e/1FAIpQLSe_W-EHx8-HzQlErq861Ljl1N2e0Ey6x7xubNQTgyhOpwaj6A/viewform?embedded=true"}_self.feedbackUrl="Yes"==t?o:d,_self.isOpen=!0}))}}};