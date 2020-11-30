import { Injectable } from '@angular/core';
import { TreeData } from './models/treeModel';
import treeData from '../assets/treeData.json';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {

  constructor() { }

  public getTreeData(): TreeData[] {
    return treeData;
  }
}
