﻿// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import * as signalR from "@microsoft/signalr";
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

// Start the connection
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}, { once: true });

        connection.on("ReceiveMessage", function (user, message) {
            var li = document.createElement("li");
            document.getElementById("messagesList").appendChild(li);
            li.textContent = user + " says " + message;
        });
   

