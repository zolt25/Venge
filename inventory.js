#pragma strict

static var healthPacks = 0;

private var player = "player";

function Start () {
}

function OnCollisionEnter(collision: Collision) {
    if (collision.gameObject.FindWithTag("HealthPack") && healthPacks < 4) {
        healthPacks++;
        Debug.Log(healthPacks);
    }
    
    return 0;
}

function Update () {
}
