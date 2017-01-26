#pragma strict

private var player = "player";

function Start () {
}

function Update () {
    transform.position = new Vector3(
        GameObject.Find(player).transform.position.x,
        10,
        GameObject.Find(player).transform.position.z-8
    );
}
