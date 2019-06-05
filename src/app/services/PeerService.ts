import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeerService {
  // public peers: Object = {};
  // public peersSockets: Object = {};
  // public peer: any;
  // public me: any;

  constructor(public http: HttpClient) {}

  // public connect(username: string, password: string) {
  //   this.http.post("http://localhost:8080/join", {name: username, port: window.location.host.split(":")[1]}).subscribe((result) => {
  //     this.getAllPeers(username);
  //   })
  // }

  // public getAllPeers(me) {
  //   this.http.get('http://localhost:8080/join').subscribe((result: Object) => {
  //     let incomingPeers = result;
  //     console.log(result);
  //     //TODO delete the real me
  //     delete incomingPeers[me]
  //     this.createNewPeers(incomingPeers);
  //     this.purgePeersNoMoreConnected(incomingPeers);
  //     console.log(this.peers)
  //     console.log(this.peersSockets)
  //   });
  // }

  // private createNewPeers(incomingPeers) {
  //   for (let peer in incomingPeers) {
  //     console.log(this.peers);
  //     if (!this.peers[peer]) {
  //       this.peers[peer] = incomingPeers[peer];
  //       console.log(peer + ' added to the list of peer');
  //       let socket = io('ws://localhost:' + this.peers[peer]);
  //       this.peersSockets[peer] = socket;
  //     }
  //   }
  // }

  // private purgePeersNoMoreConnected(incomingPeers) {
  //   for (let peer in this.peers) {
  //     if (!incomingPeers[peer]) {
  //       console.log(peer + ' removed from the list of peer');
  //       delete this.peers[peer];
  //       delete this.peersSockets[peer];
  //     }
  //   }
  // }

  // public broadCast(content, type) {
  //   content.type = type;
  //   for (let peer in this.peersSockets) {
  //     this.peersSockets[peer].emit('message', content);
  //   }
  // }
}
