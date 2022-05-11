import { IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
import xml from "fast-xml-parser";
import toml from 'toml'
import yaml from 'yaml'

export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((featureResults)=>{
        return `${featureResults.features.map((v)=>{
            let featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            let language = ''
                try {
                    const x = xml.XMLValidator.validate(featureValue)
                    if (x!== true) {
                        throw new Error("error")
                    }
                    language = 'xml'
                } catch (e) {
                        try {
                            toml.parse(featureValue)
                            language = 'ini'
                        } catch (e) {
                            try {
                                JSON.parse(featureValue)
                                language = 'json'
                            } catch (e) {
                                try {
                                    yaml.parse(featureValue)
                                    language = 'yaml'
                                } catch (e) {
                                
                                }
                            }
                        }
                }
            
            
            const hasFeature = featureValue!=null && typeof featureValue!='undefined'
            return `**${featureResults.environment.name} ${v.segment?.name?` ${v.segment.name}`:""}**
            - [${v.enabled?'x':' '}${hasFeature?
`
\`\`\`${language}
${featureValue}
\`\`\`
`:''}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
