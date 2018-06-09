function creditOption(context, chat, entities) {
    chat.sendTemplate({
        "template_type": "list",
        "top_element_style": "COMPACT",
        "elements": [{
            "title": "Test1",
            "subtitle": "ama are mult emetet as a d",
            },{
            "title": "Test2",
            "subtitle": "sagsg gds agas gs gsa g",
            },
            {
            "title": "Viorica din pascani",
            "subtitle": "asvgdsa gf saf sdf saf ",
            }
        ]
    })           
}

exports.creditOption = creditOption;
