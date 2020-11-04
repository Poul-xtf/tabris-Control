package com.tabris.Button

import android.widget.Button
import android.widget.Toast
import com.eclipsesource.tabris.android.*
import com.eclipsesource.v8.V8Object

class MyCustomView(private val scope: ActivityScope) : ObjectHandler<Button> {
    override val type: String = "com.tabris.Button"

    init { 


    }

    override fun create(id: String, properties: V8Object): Button {
        val button = Button(scope.activity)
        button.setOnClickListener {
            scope.remoteObject(it)?.notify("select")
        }
        return Button(scope.activity)
    }

    override val properties by lazy {
        super.properties + listOf<Property<Button, *>>(
                StringProperty("text", { text = it }),
                IntProperty("maxLines", { maxLines = it ?: Integer.MAX_VALUE }, { maxLines })
        )
    }

    //接受javaScript
    override fun call(button: Button, method: String, properties: V8Object) = when (method) {
        "toast-hello" -> Toast.makeText(scope.activity, "Hello", Toast.LENGTH_SHORT).show()
        "toast-noHello" -> Toast.makeText(scope.activity, "noHello", Toast.LENGTH_SHORT).show()
        else -> Toast.makeText(scope.activity, "你好世界", Toast.LENGTH_SHORT).show()
    }

    //接受listen
    override fun listen(id: String, button: Button, event: String, listen: Boolean) = when (event) {
        "select" -> button.setOnClickListener { scope.remoteObject(it)?.notify("select") }
        else ->Toast.makeText(scope.activity, "你好吗朋友", Toast.LENGTH_SHORT).show()/* super.listen(id, textInput, event, listen)*/
    }

    override fun destroy(button: Button) {
        super.destroy(button)
    }
}