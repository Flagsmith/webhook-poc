import xml from "fast-xml-parser";
import toml from "toml";
import yaml from "yaml";

// Based on a value string, this will attempt to figure out the language
export default function parseLanguage(featureValue:string) {
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
}
