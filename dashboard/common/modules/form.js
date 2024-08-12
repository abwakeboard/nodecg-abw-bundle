function formToJSON(formElement) {
    const formData = new FormData(formElement);
    const formJSON = Object.fromEntries(formData.entries())
    return formJSON;
}

function JSONToForm(formElement, jsonData) {
    if (!jsonData) return;

    Object.entries(jsonData).forEach(([key, value]) => {
        nodecg.log.debug(`Trying to set ${key} to ${value}`);
        const el = formElement.querySelector(`[name='${key}']`);
        if (!el) return;
        el.value = value;
    });

}

export { formToJSON, JSONToForm }