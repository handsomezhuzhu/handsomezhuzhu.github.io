---
title: 离散数学笔记
date: 2026-01-07 12:00:00
descriptionHTML: '<span style="color:var(--description-font-color);">离散数学学习笔记，涵盖数理逻辑、集合论与二元关系、组合数学以及图论核心知识点。</span>'
tags:
  - 离散数学
  - 笔记
sidebar: true
readingTime: true
hidden: false
recommend: false
---

## 第一章：数理逻辑

### 1.1 命题逻辑

#### 1.1.1 核心概念深度解析
- **命题**：必须是**陈述句**且具有**唯一真值**。
  - *易错点*：悖论（如"我正在说谎"）不是命题；含有未定变量的句子（如"$x+1=2$"）是谓词而非命题。
- **原子命题与复合命题**：
  - 原子命题：不能再分解的命题。
  - 复合命题：通过联结词组合而成。

#### 1.1.2 联结词与真值表 (详细版)
| 联结词 | 符号 | 英文 | 优先级 | 逻辑详解 | 常见语言表达 |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **否定** | $\neg$ | NOT | 1 | 真变假，假变真 | "并不是..." |
| **合取** | $\land$ | AND | 2 | **仅当两者全真时为真** | "且", "虽然...但是...", "既...又..." |
| **析取** | $\lor$ | OR | 3 | **仅当两者全假时为假** | "或" (包含性或) |
| **蕴涵** | $\to$ | IMPLIES | 4 | **前真后假时为假，其余全真** | "若...则...", "只要...就...", "只有...才..." |
| **双蕴涵** | $\leftrightarrow$ | IFF | 5 | **同真同假时为真** | "当且仅当", "充分必要条件" |

##### 重点难点：蕴涵关系 ($P \to Q$) 的翻译
- **充分条件**："只要 $P$ 就 $Q$" $\Rightarrow P \to Q$
- **必要条件**："只有 $Q$ 才 $P$" $\Rightarrow P \to Q$ (注意：$P$ 是 $Q$ 的充分条件，或者理解为 $\neg Q \to \neg P$)
- **除非**："除非 $P$ 否则 $Q$" $\Rightarrow \neg P \to Q$ (即 $P \lor Q$)

#### 1.1.3 命题公式的分类 (Classifications)
*常考题型：判断给定公式属于哪一类。*
1.  **永真式 (重言式, Tautology)**：
    - 在所有真值赋值下，结果均为**真** ($1$)。
    - *例*：$P \lor \neg P$
2.  **矛盾式 (永假式, Contradiction)**：
    - 在所有真值赋值下，结果均为**假** ($0$)。
    - *例*：$P \land \neg P$
3.  **可满足式 (Contingency)**：
    - **不是矛盾式**的公式（即至少有一种赋值为真）。
    - *注意*：永真式也是可满足式的一种，但通常指"既非永真也非永假"的公式。

#### 1.1.4 逻辑等值式 (Laws of Logic)
*核心：用于化简命题公式。*

1.  **双重否定律**：$\neg\neg P \Leftrightarrow P$
2.  **幂等律**：$P \lor P \Leftrightarrow P$, $P \land P \Leftrightarrow P$
3.  **交换律**：$P \lor Q \Leftrightarrow Q \lor P$, $P \land Q \Leftrightarrow Q \land P$
4.  **结合律**：$(P \lor Q) \lor R \Leftrightarrow P \lor (Q \lor R)$
5.  **分配律** (非常重要)：
    - $P \lor (Q \land R) \Leftrightarrow (P \lor Q) \land (P \lor R)$ (析取对合取的分配)
    - $P \land (Q \lor R) \Leftrightarrow (P \land Q) \lor (P \land R)$ (合取对析取的分配)
6.  **德·摩根律 (De Morgan's Laws)** (变号变词)：
    - $\neg(P \lor Q) \Leftrightarrow \neg P \land \neg Q$
    - $\neg(P \land Q) \Leftrightarrow \neg P \lor \neg Q$
7.  **吸收律** (合并同类项)：
    - $P \lor (P \land Q) \Leftrightarrow P$
    - $P \land (P \lor Q) \Leftrightarrow P$
8.  **蕴含等值式**：$P \to Q \Leftrightarrow \neg P \lor Q$ (去箭头核心公式)
9.  **等价等值式**：$P \leftrightarrow Q \Leftrightarrow (P \to Q) \land (Q \to P)$
10. **假言易位** (逆否命题)：$P \to Q \Leftrightarrow \neg Q \to \neg P$
11. **归谬律**：$(P \to Q) \land (P \to \neg Q) \Leftrightarrow \neg P$

#### 1.1.4 范式 (Normal Forms)

##### 析取范式 (DNF) 与 合取范式 (CNF)
- **定义**：
  - DNF：简单合取式的析取 ($\sum$)。例如：$(P \land Q) \lor (\neg P \land R)$
  - CNF：简单析取式的合取 ($\prod$)。例如：$(P \lor Q) \land (\neg P \lor R)$
- **主范式 (Principal NF)**：
  - **极小项 ($m_i$)**：包含所有变量的合取项，编码对应真值表中的行号。
  - **极大项 ($M_i$)**：包含所有变量的析取项。
  - **转换方法**：
    1.  **真值表法**：
        - 主析取范式：取真值表中结果为 $T$ 的行对应的极小项之和。
        - 主合取范式：取真值表中结果为 $F$ 的行对应的极大项之积。
    2.  **等值演算法**：利用双重否定、德摩根、分配律展开。

---

### 1.2 谓词逻辑 (Predicate Logic)

#### 1.2.1 基本要素
- **个体词**：常量 ($a, b$) 和 变量 ($x, y$)。
- **谓词**：$P(x_1, \dots, x_n)$，表示个体之间的性质或关系。
- **量词**：
  - 全称量词 $\forall$ (For all)
  - 存在量词 $\exists$ (Exists)
- **论域 (Universe)**：个体变元的取值范围。若未指定，通常指全总个体域。

#### 1.2.2 翻译技巧 (易错)
1.  **"所有的 S 都是 P"**：
    - 正确：$\forall x (S(x) \to P(x))$
    - *错误*：$\forall x (S(x) \land P(x))$ (这意味着宇宙中万物既是S也是P)
2.  **"有的 S 是 P"**：
    - 正确：$\exists x (S(x) \land P(x))$
    - *错误*：$\exists x (S(x) \to P(x))$ (这通常是恒真的，没有意义)

#### 1.2.3 谓词逻辑等值式
1.  **量词否定律**：
    - $\neg \forall x P(x) \Leftrightarrow \exists x \neg P(x)$ (改变量词，否定谓词)
    - $\neg \exists x P(x) \Leftrightarrow \forall x \neg P(x)$
2.  **量词辖域扩展** (设 $Q$ 不含 $x$)：
    - $\forall x (P(x) \lor Q) \Leftrightarrow (\forall x P(x)) \lor Q$
    - $\exists x (P(x) \land Q) \Leftrightarrow (\exists x P(x)) \land Q$
3.  **量词分配律**：
    - $\forall x (P(x) \land Q(x)) \Leftrightarrow \forall x P(x) \land \forall x Q(x)$ (全称对合取可分配)
    - $\exists x (P(x) \lor Q(x)) \Leftrightarrow \exists x P(x) \lor \exists x Q(x)$ (存在对析取可分配)
    - *注意*：$\forall$ 对 $\lor$ 不可分配，$\exists$ 对 $\land$ 不可分配！

#### 1.2.4 前束范式 (Prenex Normal Form)
**形式**：$Q_1 x_1 Q_2 x_2 \dots Q_k x_k M$
- 所有量词都在最左边。
- $M$ 是不含量词的基式。

**化简步骤**：
1.  **消去蕴涵**：利用 $A \to B \Leftrightarrow \neg A \lor B$。
2.  **否定内移**：利用德摩根律和量词否定律，将 $\neg$ 移到原子公式前。
3.  **变元改名**：确保不同量词使用不同的变量名 (如 $\forall x P(x) \lor \exists x Q(x)$ 改为 $\forall x P(x) \lor \exists y Q(y)$)。
4.  **量词左提**：利用量词辖域扩展规则将量词提到最前面。

---

### 1.3 推理理论 (Inference Theory)

#### 1.3.1 常用推理规则
1.  **假言推理 (Modus Ponens)**: $P, P \to Q \Rightarrow Q$
2.  **拒取式 (Modus Tollens)**: $\neg Q, P \to Q \Rightarrow \neg P$
3.  **析取三段论**: $P \lor Q, \neg P \Rightarrow Q$
4.  **假言三段论**: $P \to Q, Q \to R \Rightarrow P \to R$
5.  **化简律**: $P \land Q \Rightarrow P$
6.  **附加律**: $P \Rightarrow P \lor Q$

#### 1.3.2 谓词推理规则
1.  **全称特指 (US)**: $\forall x P(x) \Rightarrow P(c)$ (任意 $\to$ 个体)
2.  **全称推广 (UG)**: $P(x) \Rightarrow \forall x P(x)$ (任意个体 $\to$ 任意) *注意限制条件*
3.  **存在特指 (ES)**: $\exists x P(x) \Rightarrow P(c)$ (存在 $\to$ 特指常量 $c$) *注意 $c$ 必须是新引入的*
4.  **存在推广 (EG)**: $P(c) \Rightarrow \exists x P(x)$ (个体 $\to$ 存在)

#### 1.3.3 证明方法
1.  **直接证明法**：从前提及其逻辑推论出发，推导出结论。
2.  **附加前提证明法 (CP规则)**：
    - 若要证 $A \to B$，可将 $A$ 作为附加前提加入前提集，只需证出 $B$ 即可。
3.  **反证法 (归谬法)**：
    - 将结论的否定 $\neg C$ 加入前提集，推导出矛盾 ($F$)。

## 第二章：集合论与二元关系

### 2.1 集合论

#### 2.1.1 基础运算
- **并 ($\displaystyle A \cup B$)**、**交 ($\displaystyle A \cap B$)**、**补 ($\displaystyle \bar{A}$)**、**差 ($\displaystyle A - B$)**。
- **对称差 ($\displaystyle A \oplus B$)**：$\displaystyle A \oplus B = (A - B) \cup (B - A)$。
  - 属于 A 或属于 B，但不同时属于两者。
  - 特性：$\displaystyle A \oplus A = \emptyset$, $\displaystyle A \oplus \emptyset = A$, $\displaystyle A \oplus B = B \oplus A$。

#### 2.1.2 集合恒等式证明技巧
1.  **子集互证法**：证明 $\displaystyle A=B$ 即证 $\displaystyle A \subseteq B$ 且 $\displaystyle B \subseteq A$。
    - 任取 $\displaystyle x \in A$，逻辑推导 $\displaystyle x \in B$。
2.  **集合演算法**：利用集合恒等式（类似逻辑等值式）进行变形。
    - $\displaystyle A - B = A \cap \bar{B}$ (最常用的变形)
    - 德摩根律：$\displaystyle \overline{A \cup B} = \bar{A} \cap \bar{B}$
3.  **成员表法/特征函数法**：
    - 列出元素属于各集合的所有 $\displaystyle 0/1$ 组合，验证结果是否一致。

#### 2.1.3 幂集与笛卡尔积
- **幂集** $\displaystyle P(A)$：$\displaystyle A$ 的所有子集构成的集合。
  - 若 $\displaystyle |A|=n$，则 $\displaystyle |P(A)| = 2^n$。
  - *易错*：$\displaystyle \emptyset \in P(A)$, $\displaystyle A \in P(A)$。
- **笛卡尔积** $\displaystyle A \times B$：有序对的集合。
  - $\displaystyle |A \times B| = |A| \cdot |B|$。
  - 不满足交换律：$\displaystyle A \times B \neq B \times A$ (除非 $\displaystyle A=B$ 或为空)。

### 2.2 二元关系

#### 2.2.1 关系的表示与基本性质
关系 $\displaystyle R$ 是 $\displaystyle A \times A$ 的子集。
- **表示法**：集合表达式、关系矩阵 $\displaystyle M_R$、关系图 $\displaystyle G_R$。

##### 五大基本性质 (必须熟练判断)
| 性质 | 定义 | 矩阵特征 | 图特征 |
| :--- | :--- | :--- | :--- |
| **自反性** | $\displaystyle \forall x, (x,x) \in R$ | 主对角线全 1 | 每个节点都有自环 |
| **反自反性** | $\displaystyle \forall x, (x,x) \notin R$ | 主对角线全 0 | 无自环 |
| **对称性** | $\displaystyle (x,y) \in R \to (y,x) \in R$ | 对称矩阵 ($\displaystyle M=M^T$) | 所有边双向 |
| **反对称性** | $\displaystyle (x,y) \in R \land (y,x) \in R \to x=y$ | $\displaystyle m_{ij}=1 \land i \ne j \Rightarrow m_{ji}=0$ | 无双向边 |
| **传递性** | $\displaystyle (x,y) \in R \land (y,z) \in R \to (x,z) \in R$ | $\displaystyle M^2 \le M$ (布尔乘) | 有路必达（形成捷径）|

#### 2.2.2 关系矩阵详解
**定义**：设 $\displaystyle A = \{a_1, a_2, \dots, a_n\}$，关系矩阵 $\displaystyle M_R$ 是一个 $\displaystyle n \times n$ 的 0-1 矩阵。
- 若 $\displaystyle (a_i, a_j) \in R$，则 $\displaystyle m_{ij} = 1$；否则 $\displaystyle m_{ij} = 0$。

##### 关系运算的矩阵表示
1.  **逆关系**：$\displaystyle M_{R^{-1}} = (M_R)^T$ (转置矩阵)。
2.  **并集/交集**：$\displaystyle M_{R \cup S} = M_R \lor M_S$, $\displaystyle M_{R \cap S} = M_R \land M_S$ (对应位置逻辑运算)。
3.  **复合关系**：$\displaystyle M_{S \circ R} = M_R \cdot M_S$ (布尔矩阵乘法)。
    - *注意顺序*：$\displaystyle S \circ R$ 表示先 $\displaystyle R$ 后 $\displaystyle S$，矩阵乘法也是 $\displaystyle M_R$ 在前。
    - 布尔乘法规则：$\displaystyle c_{ij} = \bigvee_{k=1}^n (a_{ik} \land b_{kj})$。
4.  **幂运算**：$\displaystyle M_{R^n} = (M_R)^n$ (布尔乘幂)。

#### 2.2.3 关系性质的运算封闭性 (表 6.2)

| 运算 | 自反性 | 反自反性 | 对称性 | 反对称性 | 传递性 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **逆关系** $\displaystyle R^{-1}$ | 是 | 是 | 是 | 是 | 是 |
| **交** $\displaystyle R \cap S$ | 是 | 是 | 是 | 是 | 是 |
| **并** $\displaystyle R \cup S$ | 是 | 是 | 是 | 否 | 否 |
| **差** $\displaystyle R - S$ | 否 | 是 | 是 | 是 | 否 |
| **复合** $\displaystyle R \circ S$ | 是 | 否 | 否 | 否 | 否 |

> **注**：表中“是”表示该性质在运算下**一定**保持，“否”表示**不一定**保持。

#### 2.2.4 关系的闭包
- **自反闭包** $\displaystyle r(R) = R \cup I_A$ (矩阵：主对角线置1)
- **对称闭包** $\displaystyle s(R) = R \cup R^{-1}$ (矩阵：$\displaystyle M \lor M^T$)
- **传递闭包** $\displaystyle t(R) = R \cup R^2 \cup \dots \cup R^n$ (连通性)

##### Warshall 算法 (计算传递闭包的核心)
用于在计算机中高效计算 $\displaystyle t(R)$。
- **输入**：$\displaystyle n \times n$ 关系矩阵 $\displaystyle M$。
- **逻辑**：
  ```text
  for k from 1 to n:
      for i from 1 to n:
          for j from 1 to n:
              M[i,j] = M[i,j] or (M[i,k] and M[k,j])
  ```
  *直观理解*：第 $\displaystyle k$ 轮循环尝试以节点 $\displaystyle k$ 为中转站，如果 $\displaystyle i \to k$ 且 $\displaystyle k \to j$，则建立 $\displaystyle i \to j$ 的直达路径。

#### 2.2.5 等价关系与划分
- **定义**：满足 **自反、对称、传递** 的关系。
- **等价类** $\displaystyle [x]_R$：所有与 $\displaystyle x$ 有关系 $\displaystyle R$ 的元素集合。
- **划分**：
  - 集合 $\displaystyle A$ 被划分为若干个不相交的子集，其并集为 $\displaystyle A$。
  - **定理**：等价关系与划分一一对应。等价类就是划分出的子集。
  - *例*：整数集上的模 3 同余关系，划分为 $\displaystyle \{3k\}, \{3k+1\}, \{3k+2\}$ 三类。

#### 2.2.6 偏序关系详解
- **定义**：满足 **自反、反对称、传递** 的关系。符号 $\displaystyle \preceq$。
- **相关符号**：
  - $\displaystyle x \preceq y$：$\displaystyle x$ 小于等于 $\displaystyle y$ (或 $\displaystyle x$ 排在 $\displaystyle y$ 前)。
  - $\displaystyle x \prec y$：$\displaystyle x \preceq y \land x \ne y$。
  - **可比**：若 $\displaystyle x \preceq y$ 或 $\displaystyle y \preceq x$，则称 $\displaystyle x, y$ 可比。
  - **不可比**：若既不 $\displaystyle x \preceq y$ 也不 $\displaystyle y \preceq x$，则称 $\displaystyle x, y$ 不可比。
- **覆盖关系**：
  - 若 $\displaystyle x \prec y$ 且不存在 $\displaystyle z$ 使得 $\displaystyle x \prec z \prec y$，则称 $\displaystyle y$ 覆盖 $\displaystyle x$。
  - **哈斯图**即是基于覆盖关系绘制的简化图。

##### 哈斯图画法步骤
1.  画出覆盖关系（即去掉所有自环和传递边）。
2.  若 $\displaystyle y$ 覆盖 $\displaystyle x$，则将 $\displaystyle y$ 画在 $\displaystyle x$ 上方并连线。
3.  方向默认向上，省略箭头。

##### 特殊元素 (重要考点)
设 $\displaystyle (A, \preceq)$ 为偏序集，$\displaystyle B \subseteq A$。
1.  **极小元**：$\displaystyle B$ 中没有比它更小的元素。$\displaystyle \neg \exists x \in B, x \prec a$。
2.  **极大元**：$\displaystyle B$ 中没有比它更大的元素。$\displaystyle \neg \exists x \in B, a \prec x$。
3.  **最小元**：$\displaystyle B$ 中所有元素都比它大。$\displaystyle \forall x \in B, a \preceq x$ (若存在则唯一)。
4.  **最大元**：$\displaystyle B$ 中所有元素都比它小。$\displaystyle \forall x \in B, x \preceq a$ (若存在则唯一)。
5.  **下界**：$\displaystyle A$ 中小于等于 $\displaystyle B$ 中所有元素的元素。$\displaystyle \forall x \in B, l \preceq x$。
6.  **上界**：$\displaystyle A$ 中大于等于 $\displaystyle B$ 中所有元素的元素。$\displaystyle \forall x \in B, x \preceq u$。
7.  **下确界 (GLB/Infimum)**：最大下界。符号 $\displaystyle \inf B$ 或 $\displaystyle \wedge B$。
8.  **上确界 (LUB/Supremum)**：最小上界。符号 $\displaystyle \sup B$ 或 $\displaystyle \lor B$。

##### 示例：整除关系
设 $\displaystyle A = \{1, 2, 3, 4, 6, 12\}$，关系为整除 ($\displaystyle |$)。
- 哈斯图层级：$\displaystyle 12$ 在顶；$\displaystyle 4, 6$ 在中；$\displaystyle 2, 3$ 在下；$\displaystyle 1$ 在底。
- $\displaystyle 2$ 和 $\displaystyle 3$ 不可比。
- 子集 $\displaystyle \{2, 3\}$ 的上界是 $\displaystyle 6, 12$，上确界是 $\displaystyle 6$。
- 子集 $\displaystyle \{2, 3\}$ 的下界是 $\displaystyle 1$，下确界是 $\displaystyle 1$。

##### 格
- **定义**：偏序集 $\displaystyle (L, \preceq)$ 中任意两个元素 $\displaystyle x, y$ 都有确定的上确界 ($\displaystyle x \lor y$) 和下确界 ($\displaystyle x \land y$)。
- **性质**：格可以看作代数系统，满足交换律、结合律、吸收律。

### 2.3 函数

#### 2.3.1 函数的性质
- **单射**：
  - 定义：$\displaystyle f(a) = f(b) \Rightarrow a = b$。
  - 判别：陪域中每个元素最多被 1 个箭头指到。
- **满射**：
  - 定义：$\displaystyle \forall y \in B, \exists x \in A, f(x)=y$。
  - 判别：陪域中每个元素至少被 1 个箭头指到 (值域=陪域)。
- **双射**：既单且满。
  - 只有双射存在逆函数 $\displaystyle f^{-1}$。

#### 2.3.2 复合函数
- $\displaystyle (g \circ f)(x) = g(f(x))$。
- **性质**：
  - 若 $\displaystyle f, g$ 都是单射，则 $\displaystyle g \circ f$ 是单射。
  - 若 $\displaystyle f, g$ 都是满射，则 $\displaystyle g \circ f$ 是满射。
  - 若 $\displaystyle g \circ f$ 是单射 $\Rightarrow f$ 必为单射。
  - 若 $\displaystyle g \circ f$ 是满射 $\Rightarrow g$ 必为满射。

#### 2.3.3 特殊函数与算法复杂度
1.  **取整函数**：
    - **向下取整 (Floor)** $\lfloor x \rfloor$：小于等于 $x$ 的最大整数。
    - **向上取整 (Ceiling)** $\lceil x \rceil$：大于等于 $x$ 的最小整数。
2.  **算法复杂度 (Big-O Notation)**：
    - **定义**：设 $f, g$ 是从整数集或实数集到实数集的函数。若存在常数 $C$ 和 $k$，使得当 $x > k$ 时，$\lvert f(x) \rvert \le C \lvert g(x) \rvert$，则称 $f(x)$ 是 $O(g(x))$。
    - **常见阶**：$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$。
    - **判定技巧**：
        - 忽略系数：$7n^3$ 是 $O(n^3)$。
        - 只看最高次项：$n^2 + n + 1$ 是 $O(n^2)$。

#### 2.3.4 典型考题：等价关系的证明
**题目**：设 $R$ 是集合 $A$ 上的等价关系，证明 $R \circ R$ 也是 $A$ 上的等价关系。
**证明思路**：
1.  **自反性**：
    - $\because R$ 自反 $\therefore \forall a \in A, (a,a) \in R$。
    - 故 $(a,a) \in R \circ R$（通过中间点 $a$），即 $R \circ R$ 自反。
2.  **对称性**：
    - 任取 $(x,y) \in R \circ R$，则 $\exists t \in A$ 使得 $(x,t) \in R \land (t,y) \in R$。
    - $\because R$ 对称 $\therefore (t,x) \in R \land (y,t) \in R$。
    - 交换顺序得 $(y,t) \in R \land (t,x) \in R \Rightarrow (y,x) \in R \circ R$。
3.  **传递性**：
    - $\because R$ 传递，且 $R$ 是等价关系 $\therefore R \circ R = R$（等价关系的幂运算封闭性）。
    - $R$ 自身具备传递性，故 $R \circ R$ 传递。
    - *(注：若题目要求严格分布证明，需设 $(x,y) \in R^2, (y,z) \in R^2$ 推导 $(x,z) \in R^2$)*。

## 第三章：组合数学

### 3.0 基础数论概念 (补充)
- **完全数 (Perfect Number)**：
  - 一个正整数等于其所有**真因子**（即除了自身以外的约数）之和。
  - *例*：$6 = 1 + 2 + 3$；$28 = 1 + 2 + 4 + 7 + 14$。
  - *考点*：判断给定数字是否为完全数，或计算其真因子之和。

### 3.1 基础计数原理

#### 3.1.1 加法与乘法原理
- **加法原理 (分类)**：$S = S_1 ∪ S_2 …$ (互不相交)，则 $|S| = |S_1| + |S_2| …$
- **乘法原理 (分步)**：步骤 1 有 $n_1$ 种，步骤 2 有 $n_2$ 种... 则总数为 $n_1 \times n_2 …$

#### 3.1.2 排列与组合 (Notation: $C_n^r, P_n^r$)
| 模型 | 公式 | 典型场景 |
| :--- | :--- | :--- |
| **排列 (有序)** | $P_n^r = \frac{n!}{(n-r)!}$ | $n$ 人选 $r$ 人排队拍照 |
| **组合 (无序)** | $C_n^r = \frac{n!}{r!(n-r)!}$ | $n$ 人选 $r$ 人组队 |
| **可重排列** | $n^r$ | $r$ 位密码，每位 $n$ 种选择 |
| **可重组合** | $C_{n+r-1}^r$ | $n$ 种口味冰淇淋选 $r$ 球 (隔板法) |

#### 3.1.3 组合恒等式
1.  **对称性**：$C_n^r = C_n^{n-r}$
2.  **帕斯卡公式**：$C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$
    - *组合意义*：选 $k$ 人，要么包含特定人 A ($C_{n-1}^{k-1}$)，要么不包含 A ($C_{n-1}^k$)。
3.  **二项式定理**：$(x+y)^n = \sum_{k=0}^n C_n^k x^{n-k} y^k$
    - 推论：$\sum_{k=0}^n C_n^k = 2^n$ (所有子集个数)
    - 推论：$\sum_{k=0}^n (-1)^k C_n^k = 0$ (奇数个元素的子集数 = 偶数个元素的子集数)
4.  **范德蒙恒等式**：$C_{m+n}^r = \sum_{k=0}^r C_m^{k} C_n^{r-k}$

---

### 3.2 高级计数方法

#### 3.2.1 鸽巢原理 (Pigeonhole Principle)
- **原理**：$N$ 个物体放入 $k$ 个盒子，必有一个盒子至少有 $\lceil N/k \rceil$ 个物体。
- **应用技巧**：准确定义“鸽子”（物体）和“巢”（分类标准）。
  - *例*：任意 13 人中必有 2 人生肖相同 ($13/12 \to 2$)。

#### 3.2.2 容斥原理 (Inclusion-Exclusion)
求 $|A_1 ∪ A_2 ∪ … ∪ A_n|$：
- **公式**：$\sum |A_i| - \sum |A_i ∩ A_j| + \sum |A_i ∩ A_j ∩ A_k| - …$
- **错排问题 ($D_n$)**：$n$ 封信全部装错信封的方法数。
  - $D_n = n!(1 - \frac{1}{1!} + \frac{1}{2!} - … + (-1)^n \frac{1}{n!})$
  - 递推式：$D_n = (n-1)(D_{n-1} + D_{n-2})$

#### 3.2.3 球盒模型 (Twelvefold Way 概览)
将 $n$ 个球放入 $k$ 个盒子：

| 球 (Label) | 盒子 (Label) | 限制 | 方案数 |
| :--- | :--- | :--- | :--- |
| 不同 | 不同 | 无 | $k^n$ |
| 不同 | 不同 | $\le 1$ | $P_k^n$ |
| **相同** | **不同** | 无 | $C_{n+k-1}^n$ (隔板法) |
| **相同** | **不同** | $\ge 1$ | $C_{n-1}^{k-1}$ (先各放1个) |
| 不同 | 相同 | 无 | $S_2(n,k)$ (第二类斯特林数) |

---

### 3.3 递推关系 (Recurrence Relations)

#### 3.3.1 线性常系数齐次递推关系
形式：$a_n + c_1 a_{n-1} + … + c_k a_{n-k} = 0$
**求解步骤**：
1.  写出**特征方程**：$r^k + c_1 r^{k-1} + … + c_k = 0$。
2.  求特征根 $r_1, r_2, …$。
3.  写出通解结构：
    - **无重根**：$a_n = A_1 r_1^n + A_2 r_2^n + …$
    - **有重根** (如 $r_1$ 为 $m$ 重根)：$a_n = (A_1 + A_2 n + … + A_m n^{m-1}) r_1^n + …$
4.  代入初值求解常数 $A_i$。

#### 3.3.2 生成函数 (Generating Functions)
- **定义**：$G(x) = \sum_{n=0}^\infty a_n x^n$。
- **应用场景**：
  - 求解组合数：如 $(1+x)^n$ 的系数。
  - 求解不定方程 $x_1 + x_2 + x_3 = k$ 的非负整数解个数。
    - 构造多项式 $(1+x+x^2+…)^3$，求 $x^k$ 系数。

---

### 3.4 典型考题：不定方程解计数
**题目**：求 $x_1 + x_2 + x_3 = 15$ 的整数解个数，满足 $x_1 ≥ 1, 0 ≤ x_2 ≤ 5, x_3 ≥ 0$。
**解题思路**：
1.  **换元消下界**：令 $y_1 = x_1 - 1 ≥ 0$。
    - 原方程变为 $(y_1+1) + x_2 + x_3 = 15 ⇒ y_1 + x_2 + x_3 = 14$。
2.  **全集计算**：无上限限制时的非负整数解。
    - $\displaystyle N = C_{14+3-1}^{3-1} = C_{16}^2 = 120$。
3.  **容斥处理上界**：
    - 坏条件 $P_1$：$x_2 ≥ 6$ (即原题 $x_2 > 5$)。
    - 在坏条件 $P_1$ 下，令 $z_2 = x_2 - 6 ≥ 0$。
    - 方程变为 $y_1 + (z_2+6) + x_3 = 14 ⇒ y_1 + z_2 + x_3 = 8$。
    - $|P_1| = C_{8+3-1}^2 = C_{10}^2 = 45$。
4.  **最终结果**：$Ans = N - |P_1| = 120 - 45 = 75$。

---

### 3.5 典型考题：常系数齐次线性递推关系求解
**题目**：求解递推关系 $a_n = 7a_{n-1} - 16a_{n-2} + 12a_{n-3}$，初始条件为 $a_0 = 0, a_1 = 4, a_2 = 18$。
**解题步骤**：

1.  **构造特征方程**
    将递推式移项得 $a_n - 7a_{n-1} + 16a_{n-2} - 12a_{n-3} = 0$。
    对应的特征方程为：
    $r^3 - 7r^2 + 16r - 12 = 0$

2.  **求解特征根**
    观察系数，尝试代入 $r=2$：$8 - 28 + 32 - 12 = 0$，故 $(r-2)$ 是因子。
    多项式除法分解得：
    $(r-2)(r^2 - 5r + 6) = 0$
    $(r-2)(r-2)(r-3) = 0$
    解得特征根：$r_1 = 2$ (二重根)，$r_2 = 3$ (单根)。

3.  **写出通解结构**
    对于二重根 $2$ 和单根 $3$，通解形式为：
    $a_n = (C_1 + C_2 n) \cdot 2^n + C_3 \cdot 3^n$

4.  **代入初始条件求解常数**
    - 当 $n=0$ 时：$C_1 + C_3 = 0 \implies C_3 = -C_1$
    - 当 $n=1$ 时：$(C_1 + C_2) \cdot 2 + 3C_3 = 4$
    - 当 $n=2$ 时：$(C_1 + 2C_2) \cdot 4 + 9C_3 = 18$

    将 $C_3 = -C_1$ 代入后两式：
    - $2C_1 + 2C_2 - 3C_1 = 4 \implies -C_1 + 2C_2 = 4$
    - $4C_1 + 8C_2 - 9C_1 = 18 \implies -5C_1 + 8C_2 = 18$

    联立求解：
    由第一式得 $C_1 = 2C_2 - 4$，代入第二式：
    $-5(2C_2 - 4) + 8C_2 = 18$
    $-10C_2 + 20 + 8C_2 = 18$
    $-2C_2 = -2 \implies C_2 = 1$
    回代得 $C_1 = 2(1) - 4 = -2$
    $C_3 = -(-2) = 2$

5.  **最终解**
    $a_n = (-2 + n) \cdot 2^n + 2 \cdot 3^n$
    或整理为：
    $a_n = (n-2)2^n + 2 \cdot 3^n$

## 第四章：图论

### 4.1 图的基本概念

#### 4.1.1 定义与术语
- **图 $G=(V, E)$**：$V$ 为顶点集，$E$ 为边集。
- **度 (Degree)**：$\deg(v)$ 为关联的边数 (自环算 2 度)。
  - **握手定理**：$\sum_{v \in V} \deg(v) = 2|E|$。
  - **推论**：奇度顶点的个数必为偶数。
- **子图**：$V' \subseteq V, E' \subseteq E$。
- **补图**：$\bar{G}$，顶点相同，边互补 (完全图 $K_n$ 减去原图的边)。

#### 4.1.2 图的连通性
- **路径 (Path)**：$v_0, e_1, v_1, \dots, v_k$。
- **简单路径**：不经过重复边。
- **基本路径 (Elementary Path)**：不经过重复顶点。
- **连通图**：任意两点间均有路径。
- **割点 (Cut Vertex)**：删去该点及关联边，图分量增加。
- **割边 (Bridge)**：删去该边，图分量增加。
- **连通度**：
  - **点连通度 $\kappa(G)$**：使图不连通所需删除的最少顶点数。
  - **边连通度 $\lambda(G)$**：使图不连通所需删除的最少边数。
  - **不等式关系**：$\kappa(G) \le \lambda(G) \le \delta(G)$ (最小度)。

#### 4.1.3 图的矩阵表示
- **邻接矩阵 $A(G)$**：$n \times n$ 矩阵，$a_{ij}$ 表示 $v_i, v_j$ 间的边数。
  - 性质：$A^k$ 的元素 $a_{ij}^{(k)}$ 表示从 $v_i$ 到 $v_j$ 长度为 $k$ 的路径条数。
- **关联矩阵 $M(G)$**：顶点与边的关系。

#### 4.1.4 图的同构 (Isomorphism)
判断 $G_1 \cong G_2$ 的必要条件 (若不满足则必不同构)：
1.  顶点数、边数相同。
2.  度数列相同 (将所有点度数排序后一致)。
3.  连通分量数相同。
4.  对应长度的回路数相同 (如都有或都没有三角形)。
*充分性证明通常需要构造双射函数。*

### 4.2 特殊图类

#### 4.2.1 欧拉图 (Euler) 与 哈密顿图 (Hamilton)
| 特性 | 欧拉图 (Euler) | 哈密顿图 (Hamilton) |
| :--- | :--- | :--- |
| **定义** | 经过**每条边**恰好一次的回路 | 经过**每个顶点**恰好一次的回路 |
| **判定(充要)** | 连通 + **所有点度为偶数** | 无简单充要条件 |
| **判定(充分)** | - | (Dirac) $n \ge 3, \forall v, \deg(v) \ge n/2$ |
| **半图(路径)** | 连通 + **恰有 0 或 2 个奇度点** | - |
**哈密顿图常用判定方式 (充分/必要)**：
- **必要条件**：$\delta(G) \ge 2$；且无割点 (2-连通)。
- **Dirac 定理 (充分)**：$n \ge 3, \delta(G) \ge n/2$。
- **Ore 定理 (充分)**：$n \ge 3$ 且任意非邻接顶点 $u,v$ 满足 $\deg(u)+\deg(v) \ge n$。

#### 4.2.2 树 (Trees)
- **定义**：连通且无回路的无向图。
- **等价性质**：
  1.  无回路且 $E = V - 1$。
  2.  连通且 $E = V - 1$。
  3.  任意两点间存在**唯一**路径。
- **度数和**：$\sum_{v \in V} \deg(v) = 2E = 2(V-1)$。
- **叶子与内部点关系**：设 $L$ 为叶子数，则 $L = 2 + \sum_{\deg(v)\ge 2}(\deg(v) - 2)$。
- **树中心 (Center)**：
  - 反复删除所有叶子，最终剩下 1 个或 2 个顶点，这些顶点即中心。
  - 等价表述：中心是到其他顶点最大距离最小的顶点(们)。
- **二叉树常用关系**：
  - 满二叉树：若内部结点数为 $I$，叶子数为 $L$，则 $L = I + 1$。
  - 完全二叉树：$n$ 个结点时高度 $h = \lfloor \log_2 n \rfloor + 1$。
- **最小生成树 (MST) 算法**：
  - **Kruskal** (加边法)：按权值排序，从小到大选边，不构成回路就加入。
  - **Prim** (加点法)：从任意点开始，每次选离当前生成树集合最近的点加入。

#### 4.2.3 平面图 (Planar Graphs)
- **欧拉公式**：$V - E + R = 2$ ($R$ 为面数，包含无限面)。
- **定理**：连通简单平面图 ($V \ge 3$) 满足 $E \le 3V - 6$。
  - **证明要点**：每个面至少 3 条边，故 $3R \le 2E$，与欧拉公式联立得 $E \le 3V - 6$。
  - **性质**：简单平面图 ($V \ge 3$) 满足 $E \le 3V - 6$。
  - **重要证明：存在度数 $\le 5$ 的顶点**
    - 假设所有顶点度数 $\deg(v) \ge 6$。
    - 由握手定理：$2E = \sum \deg(v) \ge 6V \Rightarrow E \ge 3V$。
    - 这与平面图性质 $E \le 3V - 6$ 矛盾。
    - 故必然存在 $\deg(v) \le 5$ 的顶点。
  - 推论：$K_5$ ($E=10, 3V-6=9$) 不是平面图。
  - 推论：$K_{3,3}$ ($E=9, 3V-6=12$, 但它是二分图无三角形，需用 $E \le 2V-4$, $9 \not\le 8$) 不是平面图。
- **常用等价与应用**：
  - 连通简单平面图：$E \le 3V - 6 \iff V \ge (E+6)/3$。
  - 平均度：$\overline{d} = 2E/V < 6$，因此必存在度 $\le 5$ 的顶点。
  - 判否：若某简单图满足 $E > 3V - 6$，则必非平面图。
  - 若无三角形 (如二分图)，改用 $E \le 2V - 4$。
- **库拉图斯基定理 (Kuratowski)**：图是平面图 $\iff$ 不含同胚于 $K_5$ 或 $K_{3,3}$ 的子图。

#### 4.2.4 二分图 (Bipartite Graphs)
- **定义**：顶点集可划分为 $X, Y$，且所有边都在 $X$ 与 $Y$ 之间。
- **判定**：图是二分图 $\iff$ 图中**没有奇数长度的回路**。
- **完全二分图**：$K_{m,n}$，$|X|=m, |Y|=n$，边数 $E = mn$。
- **度数与边数**：$\sum_{x \in X}\deg(x)=\sum_{y \in Y}\deg(y)=|E|$。
- **平面图推论**：连通简单二分平面图 ($V \ge 3$) 满足 $E \le 2V - 4$。
- **二染色判定 (BFS/DFS)**：
  1.  对每个连通分量，任选起点染色为 0。
  2.  进行 BFS/DFS，对每条边 $(u,v)$ 要求 $color[u] \ne color[v]$。
  3.  若遇到冲突 (已染且相同) 则非二分图；无冲突则是二分图。
- **匹配**：Hall 定理 (相异代表系)。

### 4.3 核心算法逻辑

#### 4.3.1 最短路径 (Dijkstra)
*适用于非负权图。*
1.  初始化：$S=\{start\}$, $dist[start]=0$, 其他无穷大。
2.  循环：
    - 在 $V-S$ 中找 $dist$ 最小的点 $u$。
    - 加入 $S$。
    - 松弛 (Relax) $u$ 的所有邻居 $v$：若 $dist[u] + w(u,v) < dist[v]$，则更新。

#### 4.3.2 图着色 (Graph Coloring)
- **点色数 $\chi(G)$**：相邻顶点不同色所需的最少颜色数。
- **布鲁克定理 (Brooks)**：若 $G$ 不是奇环也不是完全图，则 $\chi(G) \le \Delta(G)$ (最大度)。
- **平面图四色定理**：平面图 $\chi(G) \le 4$。
- **色多项式 $P_k(G)$**：用 $k$ 种颜色染色的方案数。
  - 递推公式：$P_k(G) = P_k(G-e) - P_k(G \cdot e)$
    - $G-e$：删边。
    - $G \cdot e$：收缩边 (合并端点)。

#### 4.3.3 最优二叉树 (Huffman Coding)
*常考题型：给定一组权值，构造哈夫曼树并计算带权路径长度 (WPL)。*

1.  **算法步骤**：
    - **初始化**：将所有权值看作独立的单节点树森林 $F = \{T_1, T_2, \dots\}$。
    - **循环**：
        1. 在 $F$ 中选出**根节点权值最小**的两棵树 $T_1, T_2$。
        2. 构造新树：根权值为 $W(T_1) + W(T_2)$，左右子树分别为 $T_1, T_2$。
        3. 从 $F$ 中删除 $T_1, T_2$，加入新树。
        4. 重复直到 $F$ 中只剩一棵树。
2.  **带权路径长度 (WPL)**：
    - $WPL = \sum_{i=1}^n w_i \times l_i$
    - $w_i$：第 $i$ 个叶子的权值。
    - $l_i$：第 $i$ 个叶子到根的路径长度（边数）。
    - *简便算法*：WPL = 所有非叶子节点的权值之和。

