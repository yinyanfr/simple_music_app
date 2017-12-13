import en from "./../i18n/en";
import fr from "./../i18n/fr";
import jp from "./../i18n/jp";
import zh from "./../i18n/zh-cn";

const lang = {
    en,
    fr,
    jp,
    zh
}

const i18nDefaultState = {
    t: lang[en]
}

export default (state = i18nDefaultState, action) => {
    const {langname} = action.data || "en"
    switch(action.type){
        case "CHANGELANGUAGE":
            console.log(lang[langname])
            return {
                t: lang[langname]
            } 
        default:
            return {
                t: lang.en
            }
    }
}
