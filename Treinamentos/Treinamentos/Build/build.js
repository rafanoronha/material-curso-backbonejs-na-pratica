({
    baseUrl: "../Scripts/",
    dir: "../Content/dist",
    mainConfigFile: '../Scripts/main.js',
    removeCombined: true,
    fileExclusionRegExp: /^\.|^_references.js$|vsdoc.js$/,
    modules: [
        {
            name: "main",
        },
        {
            name: "app",
            exclude: ["app/turma", "app/instrutor", "app/treinamento"]
        },
        {
            name: "app/turma",
        },
        {
            name: "app/instrutor",
        },
        {
            name: "app/treinamento"
        },
    ]
})