#pragma strict
public static var heal = 40;

public var player = "player";
public var attractSpeed : float = 0.2;

private var negX : float;
private var negZ : float;

private function xPos() {
    if (GameObject.Find(player).transform.position.x <= transform.position.x) {
        negX = -attractSpeed;
    } else {
        negX = attractSpeed;
    }

    if (transform.position.x != GameObject.Find(player).transform.position.x) {
        transform.position.x += negX;
    }

    return 0;

    /*
    if (Mathf.Round(transform.position.x) != Mathf.Round(GameObject.Find(player).transform.position.x)) {
        transform.position.x += negX;
    }
    */
    
    /*
    do {
        transform.position.x += negativeX
    } while (Mathf.Round(transform.position.x) != Mathf.Round(GameObject.Find(player).transform.position.x));
    */
}

private function zPos() {
    if (GameObject.Find(player).transform.position.z <= transform.position.z) {
        negZ = -attractSpeed;
    } else {
        negZ = attractSpeed;
    }
    transform.position.z += negZ;

    return 0;
}

function Start () {
}

function Update () {
// Priblizava se ako si u radijusu, fuckfest ukratko
if (
    Mathf.Abs(GameObject.Find(player).transform.position.x) > Mathf.Abs(transform.position.x) || 
    Mathf.Abs(GameObject.Find(player).transform.position.z) > Mathf.Abs(transform.position.z)
) {
    if (
        Mathf.Abs(GameObject.Find(player).transform.position.x) - Mathf.Abs(transform.position.x) <= 4 && 
        Mathf.Abs(GameObject.Find(player).transform.position.z) - Mathf.Abs(transform.position.z) <= 4
    ) {
        xPos();
        zPos();
    }
} else if (
    Mathf.Abs(GameObject.Find(player).transform.position.x) < Mathf.Abs(transform.position.x) || 
    Mathf.Abs(GameObject.Find(player).transform.position.z) < Mathf.Abs(transform.position.z)
) {
    if (
        Mathf.Abs(transform.position.x) - Mathf.Abs(GameObject.Find(player).transform.position.x) <= 4 && 
        Mathf.Abs(transform.position.z) - Mathf.Abs(GameObject.Find(player).transform.position.z) <= 4
    ) {
        xPos();
        zPos();
    }
}
    
    /*
    if (
        Mathf.Abs(GameObject.Find(player).transform.position.x) - Mathf.Abs(transform.position.x) <= -2 || 
        Mathf.Abs(GameObject.Find(player).transform.position.z) <= -2
    ) {
        xPos();
        zPos();
    }
    */

}

function OnCollisionEnter(col: Collision){
    if (col.gameObject.tag.Equals("Player") == true && inventory.healthPacks < 4) {
        Destroy(gameObject);
    }
    
    return 0;
}
