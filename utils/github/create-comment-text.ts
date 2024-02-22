import moment from 'moment'
import parseLanguage from "../parseLanguage";
import mockedConstants from "../mockedConstants";

const title = '### This pull request is linked to a Flagsmith Feature'
const openingMarkdown = (language:string)=>`\`\`\`${language}`
const closingMarkdown = `\`\`\``


export interface IFeaturesState {
    environment_name: string
    feature_value: boolean
    segment_name?: string
    integer_value?: number
    string_value?: string
    boolean_value?: boolean
}
export interface IFeaturesStates {
    featureStates: IFeaturesState[]
}

// Based on a set of feature states across multiple environments, returns markdown text for a comment
export default function generateFeatureString(name: string, featureStates: IFeaturesStates, event_type: string) {

    const isInteger = value => Number.isInteger(value);
    const isString = value => typeof value === 'string';
    const isBoolean = value => typeof value === 'boolean';
    const isUpdate = event_type === 'FLAG_UPDATED'
    const isRemoved = event_type === 'FEATURE_EXTERNAL_RESOURCE_REMOVED'
    const DeleteText = `### The feature flag ${name} was unlinked from the issue/PR`
    if(isRemoved){
        return `${DeleteText}`
    }
    const lastUpdatedString = `Last Updated ${moment().format("Do MMM YYYY HH:mma")}`
    const updatedText = `### The Flagsmith Feature ${name} was updated in the environment ${featureStates[0].environment_name}`
    return `${isUpdate ? updatedText :  `title (${name})`}:
${featureStates?.map((v: IFeaturesState)=>{
    let featureValue = isInteger(v.integer_value) ? v.integer_value :
    isString(v.string_value) ? v.string_value :
    isBoolean(v.boolean_value) ? v.boolean_value :
    [v.integer_value, v.string_value, v.boolean_value].filter(value => value !== undefined);

    let featureIntegerValue = v?.integer_value || ''
    let featureStringValue = v?.string_value || ''
    let featureBooleanValue = v?.boolean_value || ''
    const hasFeatureValue = featureValue!=null && typeof featureValue!='undefined'
    let language = hasFeatureValue ? parseLanguage(featureValue) : ''
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
