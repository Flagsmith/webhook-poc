import {IFeaturesResults} from "../flagsmith/api/fetch-feature";
import moment from 'moment'
import parseLanguage from "../parseLanguage";
import mockedConstants from "../mockedConstants";

const title = '### This pull request is linked to a Flagsmith Feature'
const openingMarkdown = (language:string)=>`\`\`\`${language}`
const closingMarkdown = `\`\`\``

// Based on a set of feature states across multiple environments, returns markdown text for a comment
export default function generateFeatureString(name: string, featureStates: IFeaturesStates) {
    const lastUpdatedString = `Last Updated ${moment().format("Do MMM YYYY HH:mma")}`
    return `${title} (${name}):
${featureStates?.map((v)=>{
    let featureIntegerValue = v?.integer_value || ''
    let featureStringValue = v?.string_value || ''
    let featureBooleanValue = v?.boolean_value || ''
    // const hasFeatureValue = featureStringValue!=null && typeof featureStringValue!='undefined'
    let language = featureIntegerValue ? parseLanguage(featureStringValue) : ''
    const featureValueString =  `
${openingMarkdown(language||'')}
${featureStringValue?featureStringValue:mockedConstants.featureNoValue}
${closingMarkdown}
`
            return `**${v.environment_name}${v?.segment_name?`  - ${v.segment_name}`:""}**\n\r
- [${v.feature_value?'x':' '}] ${v.feature_value?'Enabled': 'Disabled'}${featureValueString}`
}).join("\n")}

${lastUpdatedString}
`
}
